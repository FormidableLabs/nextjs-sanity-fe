import * as React from "react";
import groq from "groq";
import { sanityClient } from "utils/sanityClient";

export type CartItem = {
  _id: string;
  qty: number;
  variantInfo: CartItemVariant;
};

const initialValue = {
  isFetchingCartItems: false,
  cartItems: [] as CartItem[],
  cartItemsErrorIds: [] as string[] | undefined,
  cartTotal: 0,
  totalCartPrice: 0,
  updateCart: (() => null) as (productId: string, quantity: number) => void,
  clearCart: (() => null) as () => void,
  updateCartFromApi: (() => null) as () => void,
};

type CartContextValue = typeof initialValue;

export const CartContext = React.createContext<CartContextValue>(initialValue);

export const useCart = () => React.useContext(CartContext);

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [cartItemsErrorIds, setCartItemsErrorIds] = React.useState<string[] | undefined>();
  const [isFetchingCartItems, setIsFetchingCartItems] = React.useState(true);

  const retrieveCartItems = React.useCallback(async (cart: Record<string, number>) => {
    const cartEntries = Object.entries(cart);

    if (cartEntries.length > 0) {
      // Fetch all products with a variant with the same ID
      const variantIdFilters = cartEntries.map(([id, _]) => `(_id == "${id}")`);
      const groqFilters = variantIdFilters.length ? `&& (${variantIdFilters.join(" || ")})` : "";
      const getResults = () =>
        sanityClient.fetch<CartItemVariant[]>(
          groq`*[_type == "variant" ${groqFilters}] {
            _id, name, price, msrp
          }`
        );
      const res = await throttle(getResults, 1000);

      const errorRetrievingIds: string[] = [];

      const formattedItems = cartEntries.reduce<CartItem[]>((acc, [variantId, quantity]) => {
        const productInfo = res.find((variant) => variant._id === variantId);
        if (productInfo) {
          return [...acc, { _id: variantId, qty: quantity, variantInfo: productInfo }];
        }

        errorRetrievingIds.push(variantId);
        return acc;
      }, []);

      setCartItems(formattedItems);
      setCartItemsErrorIds(errorRetrievingIds.length ? errorRetrievingIds : undefined);
    } else {
      // Skip fetching when cart is empty
      setCartItems([]);
      setCartItemsErrorIds(undefined);
    }

    setIsFetchingCartItems(false);
  }, []);

  const updateCartFromApi = React.useCallback(async () => {
    const data = await fetch("/api/cart", {
      credentials: "same-origin",
    }).then((res) => res.json());

    retrieveCartItems(data);
  }, [retrieveCartItems]);

  React.useEffect(() => {
    updateCartFromApi();
  }, [updateCartFromApi]);

  const updateCart = React.useCallback(
    async (variantId: string, quantity: number) => {
      if (!variantId) {
        return;
      }

      try {
        const data = await fetch("/api/cart", {
          method: "PUT",
          body: JSON.stringify({
            _id: variantId,
            quantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        retrieveCartItems(data);
      } catch (error) {
        console.error(error);
      }
    },
    [retrieveCartItems]
  );

  // Clear the whole cart
  const clearCart = async () => {
    try {
      await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setCartItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  // Calculates the total quantity of all items in the cart
  const cartTotal = React.useMemo(() => cartItems.reduce((acc, { qty }) => acc + qty, 0), [cartItems]);

  const totalCartPrice = React.useMemo(
    () => cartItems.reduce((acc, { qty, variantInfo }) => acc + qty * variantInfo.price, 0),
    [cartItems]
  );

  return (
    <CartContext.Provider
      value={{
        isFetchingCartItems,
        cartItems,
        cartItemsErrorIds,
        updateCart,
        clearCart,
        cartTotal,
        updateCartFromApi,
        totalCartPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));

const throttle = <T,>(action: () => Promise<T>, ms: number): Promise<T> =>
  Promise.all([action(), wait(ms)]).then((res) => res[0]);

type CartItemVariant = {
  _id: string;
  name: string;
  msrp: number;
  price: number;
};

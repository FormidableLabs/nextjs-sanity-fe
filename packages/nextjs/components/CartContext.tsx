import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import groq from "groq";
import { CategoryPageProduct } from "utils/groqTypes";
import { sanityClient } from "utils/sanityClient";

type CartItem = {
  id: string;
  qty: number;
  item: CategoryPageProduct;
};

const initialValue = {
  isFetchingCartItems: false,
  cartItems: [] as CartItem[],
  cartItemsErrorIds: [] as string[] | undefined,
  cartTotal: 0,
  totalCartPrice: 0,
  updateCart: (() => {}) as (productId: string, quantity: number) => void,
  clearCart: (() => {}) as () => void,
  updateCartFromApi: (() => {}) as () => void,
};

type CartContextValue = typeof initialValue;

export const CartContext = createContext<CartContextValue>(initialValue);

interface Props {
  children: ReactNode;
}

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsErrorIds, setCartItemsErrorIds] = useState<string[] | undefined>();
  const [isFetchingCartItems, setIsFetchingCartItems] = useState(true);

  const retrieveCartItems = useCallback(async (cart: Record<string, number>) => {
    const cartEntries = Object.entries(cart);

    if (cartEntries.length > 0) {
      // Fetch all products with a variant with the same ID
      const variantIdFilters = cartEntries.map(([id, _]) => `("${id}" in variants[]->id)`);
      const groqFilters = variantIdFilters.length ? `&& (${variantIdFilters.join(" || ")})` : "";
      const getResults = () =>
        sanityClient.fetch(
          groq`{
          'products': *[_type == "product" ${groqFilters}] {
            ...,
            'imageAlt': images[0]->name,
            'images': images[0]->images,
            'msrp': variants | order(price asc)[0]->msrp,
            'price': variants | order(price asc)[0]->price,
            'variants': variants[]->{
              ...,
              'size': size->name
            }
          }
        }`
        );
      const res = await throttle(getResults, 1000);

      const errorRetrievingIds: string[] = [];

      const formattedItems = cartEntries.reduce((acc: CartItem[], [variantId, qty]) => {
        // Find first product that includes variant with matching ID
        const productInfo = (res.products as CategoryPageProduct[]).find(({ variants }) => {
          const productVariantIds = variants.map(({ id }) => id);
          return productVariantIds.includes(variantId);
        });

        if (productInfo) {
          return [...acc, { id: variantId, qty, item: productInfo }];
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

  const updateCartFromApi = useCallback(async () => {
    const data = await fetch("/api/cart", {
      credentials: "same-origin",
    }).then((res) => res.json());

    retrieveCartItems(data);
  }, [retrieveCartItems]);

  useEffect(() => {
    updateCartFromApi();
  }, [updateCartFromApi]);

  //
  const updateCart = useCallback(
    async (variantId: string, quantity: number) => {
      if (!variantId) {
        return;
      }

      try {
        const data = await fetch("/api/cart", {
          method: "PUT",
          body: JSON.stringify({
            id: variantId,
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
  const cartTotal = useMemo(() => cartItems.reduce((acc, { qty }) => acc + qty, 0), [cartItems]);

  const totalCartPrice = useMemo(
    () => cartItems.reduce((acc, { qty, item }) => acc + qty * item.price, 0),
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

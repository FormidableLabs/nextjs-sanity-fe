import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import groq from "groq";
import { CategoryPageProduct } from "utils/groqTypes";
import { sanityClient } from "utils/sanityClient";

type CartItem = {
  id: string;
  qty: number;
  item: CategoryPageProduct;
};

interface CartContextValue {
  cart: Record<string, number>;
  cartItems: CartItem[];
  cartItemsErrorIds?: string[];
  cartTotal: number;
  retrieveCartItems: () => void;
  updateCart: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const initialValue = {
  cart: {},
  cartItems: [],
  cartItemsErrorIds: undefined,
  cartTotal: 0,
  retrieveCartItems: () => {},
  updateCart: () => {},
  clearCart: () => {},
};

export const CartContext = createContext<CartContextValue>(initialValue);

interface Props {
  children: ReactNode;
}

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemsErrorIds, setCartItemsErrorIds] = useState<string[] | undefined>();
  const [cartTotal, setCartTotal] = useState(0);

  const retrieveCartItems = useCallback(() => {
    const cartEntries = Object.entries(cart);

    if (cartEntries.length > 0) {
      // Fetch all products with a variant with the same ID
      const variantIdFilters = cartEntries.map(([id, _]) => `("${id}" in variants[]->id)`);
      const groqFilters = variantIdFilters.length ? `&& (${variantIdFilters.join(" || ")})` : "";
      sanityClient
        .fetch(
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
        )
        .then((res) => {
          const errorRetrievingIds: string[] = [];
          let totalQty = 0;

          const formattedItems = cartEntries.reduce((acc: CartItem[], [variantId, qty]) => {
            // Find first product that includes variant with matching ID
            const productInfo = (res.products as CategoryPageProduct[]).find(({ variants }) => {
              const productVariantIds = variants.map(({ id }) => id);
              return productVariantIds.includes(variantId);
            });

            if (productInfo) {
              totalQty += qty;
              return [...acc, { id: variantId, qty, item: productInfo }];
            }

            errorRetrievingIds.push(variantId);
            return acc;
          }, []);

          setCartItems(formattedItems);
          setCartItemsErrorIds(errorRetrievingIds.length ? errorRetrievingIds : undefined);
          setCartTotal(totalQty);
        });
    } else {
      // Skip fetching when cart is empty
      setCartItems([]);
      setCartItemsErrorIds(undefined);
      setCartTotal(0);
    }
  }, [cart]);

  // Retrieve product info and calc total items when cart is updated
  useEffect(() => {
    retrieveCartItems();
  }, [cart, retrieveCartItems]);

  const updateCartFromApi = useCallback(async () => {
    const data = await fetch("/api/cart", {
      credentials: "same-origin",
    }).then((res) => res.json());

    setCart(data);
  }, []);

  useEffect(() => {
    updateCartFromApi();
  }, [updateCartFromApi]);

  const updateCart = async (variantId: string, qty: number) => {
    if (!variantId) {
      return;
    }

    try {
      const data = await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({
          [variantId]: qty,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  const clearCart = async () => {
    try {
      const data = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setCart(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        cartItemsErrorIds,
        retrieveCartItems,
        updateCart,
        clearCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import groq from "groq";
import { Product } from "utils/groqTypes";
import { sanityClient } from "utils/sanityClient";

type CartItem = {
  id: string;
  qty: number;
  item: Product;
};

interface CartContextValue {
  cart: Record<string, number>;
  cartItems: CartItem[];
  updateCart: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const initialValue = {
  cart: {},
  cartItems: [],
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

  // Fetch product info when cart is updated
  useEffect(() => {
    const variantIds: string[] = Object.keys(cart);
    const variantIdFilters = variantIds.map((id) => `("${id}" in variants[]->id)`);
    const groqFilters = variantIdFilters.length ? `&& (${variantIdFilters.join(" || ")})` : "";

    // Get all products with a variant with the same ID
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
        const formattedItems = variantIds.reduce((acc: CartItem[], variantId) => {
          // Find first product that includes variant with matching ID
          const productInfo = (res.products as Product[]).find(({ variants }) => {
            const productVariantIds = variants.map(({ id }) => id);
            return productVariantIds.includes(variantId);
          });

          if (productInfo) {
            return [...acc, { id: variantId, qty: cart[variantId], item: productInfo }];
          }

          console.error("No product info for ID", variantId);
          return acc;
        }, []);

        setCartItems(formattedItems);
      });
  }, [cart, setCartItems]);

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
        updateCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

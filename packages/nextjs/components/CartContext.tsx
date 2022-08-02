import Cookie from "js-cookie";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface CartContextValue {
  cart: Record<string, number>;
  updateCart: (productId: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextValue>({} as CartContextValue);

interface Props {
  children: ReactNode;
}

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Record<string, number>>({});

  const updateCartFromApi = useCallback(async (callApi: boolean = true) => {
    if (callApi) {
      await fetch("/api/cart", {
        credentials: "same-origin",
      });
    }

    const cookie = Cookie.get(process.env.NEXT_PUBLIC_CART_COOKIE_NAME);
    console.log(cookie);

    setCart(JSON.parse(cookie ?? "{}"));
  }, []);

  useEffect(() => {
    updateCartFromApi();
  }, [updateCartFromApi]);

  const updateCart = async (variantId: string, qty: number) => {
    if (!variantId) {
      return;
    }

    setCart((c) => {
      const newCart = {
        ...c,
        [variantId]: (c[variantId] ?? 0) + qty,
      };

      Object.entries(newCart).forEach(([id, qty]) => {
        if (qty === 0) {
          delete newCart[id];
        }
      });

      return newCart;
    });

    try {
      await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({
          [variantId]: qty,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      updateCartFromApi(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        updateCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

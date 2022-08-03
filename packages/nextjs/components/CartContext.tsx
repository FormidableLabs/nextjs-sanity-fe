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

import { createContext, ReactNode, useContext, useState } from "react";

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

  const updateCart = (variantId: string, qty: number) => {
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

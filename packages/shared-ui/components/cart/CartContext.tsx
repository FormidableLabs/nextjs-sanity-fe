import React, { useEffect, useReducer } from "react";
import { CartUpdate, cartReducer, initialState } from "./reducer/cartReducer";

export type CartItem = {
  _id: string;
  quantity: number;
  name: string;
  price: number;
};

type CartContext<P extends CartItem> = {
  cartItems: P[];
  updateCart: (changeSet: CartUpdate) => void;
  clearCart: () => void;
  isLoading: boolean;
  totalQuantity: number;
  totalPrice: number;
  errorLines: string[];
  toggleCartOpen: (isOpen: boolean) => void;
  isCartOpen: boolean;
  cartPopupRef: React.RefObject<HTMLDivElement> | null;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialValues = {
  cartItems: [],
  updateCart: noop,
  clearCart: noop,
  toggleCartOpen: noop,
  isLoading: false,
  isCartOpen: false,
  totalQuantity: 0,
  totalPrice: 0,
  cartPopupRef: null,
  errorLines: [],
};

const CartContext = React.createContext<CartContext<CartItem>>(initialValues);

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContext.Provider");
  }

  return context;
};

type ManagedCart = {
  onCartFetch: () => Promise<{ results: CartItem[]; errors?: string[] }>;
  onCartUpdate: (changeSet: CartUpdate) => void;
  onCartClear: () => void;
  errorLines: string[];
};

type LocalCart = Omit<ManagedCart, "onCartFetch" | "onCartUpdate" | "onCartClear" | "errorLines">;
type ProviderProps = LocalCart | ManagedCart;

export const CartProvider = ({ children, ...props }: React.PropsWithChildren<ProviderProps>) => {
  const isManaged = "onCartFetch" in props && typeof props.onCartFetch !== "undefined";
  const [{ cartItems, state, isCartOpen }, dispatch] = useReducer(cartReducer, {
    ...initialState,
    state: isManaged ? "loading" : "success",
  });

  const updateCart = React.useCallback(
    (changeSet: CartUpdate) => {
      if (isManaged) {
        props.onCartUpdate(changeSet);
      }

      dispatch({ type: "update", payload: changeSet });
    },
    [isManaged]
  );

  const clearCart = React.useCallback(() => {
    if (isManaged) {
      props.onCartClear();
    }

    dispatch({ type: "reset" });
  }, []);

  const fetchCart = isManaged && props.onCartFetch;
  const isLoading = state === "loading";
  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const fetch = async () => {
      if (!fetchCart) {
        return;
      }

      const { results, errors } = await fetchCart();
      dispatch({ type: "success", payload: { results, errors } });
    };

    if (isManaged) {
      fetch();
    } else {
      dispatch({ type: "success", payload: { results: [] } });
    }
  }, [isManaged, fetchCart, isLoading]);

  const { totalQuantity, totalPrice } = React.useMemo(
    () =>
      cartItems.reduce(
        (acc, { quantity, price }) => {
          return { totalPrice: acc.totalPrice + quantity * price, totalQuantity: acc.totalQuantity + quantity };
        },
        { totalQuantity: 0, totalPrice: 0 }
      ),
    [cartItems]
  );
  const errorLines = isManaged ? props.errorLines : [];

  useEffect(() => {
    document.body.classList[isCartOpen ? "add" : "remove"]("overflow-hidden", "sm:overflow-auto");
  }, [isCartOpen]);

  const toggleCartOpen = (open: boolean) => dispatch({ type: "toggleCartOpen", payload: open });
  const cartPopupRef = React.useRef<HTMLDivElement>(null);

  return (
    <CartContext.Provider
      value={{
        toggleCartOpen,
        isCartOpen,
        errorLines,
        totalQuantity,
        totalPrice,
        cartItems,
        updateCart,
        clearCart,
        isLoading,
        cartPopupRef,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

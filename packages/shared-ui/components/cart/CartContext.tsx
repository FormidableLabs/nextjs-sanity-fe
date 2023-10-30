import React, { useEffect, useReducer } from "react";

type CartItem = { qty: number };

type CartContext<P extends CartItem> = {
  cartItems: P[];
  updateCart: (changeSet: CartUpdate) => void;
  clearCart: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialValues = {
  cartItems: [],
  updateCart: noop,
  clearCart: noop,
};

const CartContext = React.createContext<CartContext<CartItem>>(initialValues);

export const useCart = () => {
  const context = React.useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContext.Provider");
  }

  return context;
};

type Action =
  | { type: "loading" }
  | { type: "update"; payload: CartUpdate }
  | { type: "reset" }
  | { type: "success"; payload: CartItem[] };

type CartState = {
  cartItems: CartItem[];
  state: "loading" | "success";
};

const initialState: CartState = {
  cartItems: [],
  state: "loading",
};

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "loading":
      return { ...state, state: "loading" };
    case "update":
      return { ...state };
    case "reset":
      return { ...state, cartItems: [] };
    case "success":
      return { ...state, state: "success", cartItems: action.payload };
  }
};

type ManagedCart = {
  onCartFetch: () => CartItem[];
  onCartUpdate: (changeSet: CartUpdate) => void;
  onCartClear: () => void;
};

type LocalCart = Omit<ManagedCart, "onCartFetch" | "onCartUpdate">;
type ProviderProps = LocalCart | ManagedCart;

type CartUpdate = {
  id: number;
  qty: number;
};

export const CartProvider = ({ children, ...props }: React.PropsWithChildren<ProviderProps>) => {
  const isManaged = "onCartFetch" in props && typeof props.onCartFetch !== "undefined";
  const [{ cartItems, state }, dispatch] = useReducer(cartReducer, initialState);

  const updateCart = React.useCallback(
    (changeSet: CartUpdate) => {
      if (isManaged) {
        props.onCartUpdate(changeSet);
      } else {
        dispatch({ type: "update", payload: changeSet });
      }
    },
    [isManaged]
  );

  const clearCart = React.useCallback(() => {
    if (isManaged) {
      props.onCartClear();
    } else {
      dispatch({ type: "reset" });
    }
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

      const results = await fetchCart();
      dispatch({ type: "success", payload: results });
    };

    if (isManaged) {
      fetch();
    } else {
      dispatch({ type: "success", payload: [] });
    }
  }, [isManaged, fetchCart, isLoading]);

  return <CartContext.Provider value={{ cartItems, updateCart, clearCart }}>{children}</CartContext.Provider>;
};

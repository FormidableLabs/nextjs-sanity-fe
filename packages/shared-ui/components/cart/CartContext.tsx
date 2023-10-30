import React, { useEffect, useReducer } from "react";

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
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const initialValues = {
  cartItems: [],
  updateCart: noop,
  clearCart: noop,
  isLoading: false,
  totalQuantity: 0,
  totalPrice: 0,
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

type Action =
  | { type: "loading" }
  | { type: "update"; payload: CartUpdate }
  | { type: "reset" }
  | { type: "success"; payload: { results: CartItem[]; errors?: string[] } };

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
    case "update": {
      const updateIndex = state.cartItems.findIndex(({ _id }) => _id === action.payload._id);
      const newCartItems = [
        ...state.cartItems.slice(0, updateIndex),
        ...(action.payload.quantity === 0
          ? []
          : [
              {
                ...state.cartItems[updateIndex],
                ...action.payload,
              },
            ]),
        ...state.cartItems.slice(updateIndex + 1),
      ];
      return { ...state, cartItems: newCartItems };
    }
    case "reset":
      return { ...state, cartItems: [] };
    case "success":
      return { ...state, state: "success", cartItems: action.payload.results };
  }
};

type ManagedCart = {
  onCartFetch: () => Promise<{ results: CartItem[]; errors?: string[] }>;
  onCartUpdate: (changeSet: CartUpdate) => void;
  onCartClear: () => void;
  errorLines: string[];
};

type LocalCart = Omit<ManagedCart, "onCartFetch" | "onCartUpdate" | "onCartClear" | "errorLines">;
type ProviderProps = LocalCart | ManagedCart;

export type CartUpdate = Partial<CartItem> & {
  _id: string;
  quantity: number;
};

export const CartProvider = ({ children, ...props }: React.PropsWithChildren<ProviderProps>) => {
  const isManaged = "onCartFetch" in props && typeof props.onCartFetch !== "undefined";
  const [{ cartItems, state }, dispatch] = useReducer(cartReducer, {
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

  return (
    <CartContext.Provider
      value={{ errorLines, totalQuantity, totalPrice, cartItems, updateCart, clearCart, isLoading }}
    >
      {children}
    </CartContext.Provider>
  );
};

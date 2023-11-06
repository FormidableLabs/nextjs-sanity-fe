import { CartItem } from "../CartContext";

export type CartUpdate = Partial<CartItem> & {
  _id: string;
  quantity: number;
};

type Action =
  | { type: "loading" }
  | { type: "update"; payload: CartUpdate }
  | { type: "reset" }
  | { type: "success"; payload: { results: CartItem[]; errors?: string[] } }
  | { type: "toggleCartOpen"; payload: boolean };

type CartState = {
  cartItems: CartItem[];
  state: "loading" | "success";
  isCartOpen: boolean;
  totalQuantity: number;
  totalPrice: number;
};

export const initialState: CartState = {
  cartItems: [],
  state: "loading",
  isCartOpen: false,
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartReducer = (state: CartState, action: Action): CartState => {
  let newState = state;

  switch (action.type) {
    case "loading":
      newState = { ...state, state: "loading" };
      break;
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
      newState = { ...state, cartItems: newCartItems };
      break;
    }
    case "reset":
      newState = { ...state, cartItems: [] };
      break;
    case "success":
      newState = { ...state, state: "success", cartItems: action.payload.results };
      break;
    case "toggleCartOpen":
      newState = { ...state, isCartOpen: action.payload };
      break;
  }

  const { totalQuantity, totalPrice } = newState.cartItems.reduce(
    (acc, { quantity, price }) => {
      return { totalPrice: acc.totalPrice + quantity * price, totalQuantity: acc.totalQuantity + quantity };
    },
    { totalQuantity: 0, totalPrice: 0 }
  );

  return {
    ...newState,
    totalQuantity,
    totalPrice,
  };
};

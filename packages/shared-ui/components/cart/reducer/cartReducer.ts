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
};

export const initialState: CartState = {
  cartItems: [],
  state: "loading",
  isCartOpen: false,
};

export const cartReducer = (state: CartState, action: Action): CartState => {
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
    case "toggleCartOpen":
      return { ...state, isCartOpen: action.payload };
  }
};

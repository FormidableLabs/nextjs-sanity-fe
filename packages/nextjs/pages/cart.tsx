import { useCart } from "../components/CartContext";
import { CartItem } from "../components/CartItem";

import type { NextPage } from "next";

interface Props {
  cartItems: Record<string, any>;
}

const CartPage: NextPage<Props> = (props) => {
  const { cart, clearCart } = useCart();
  const cartArray = Object.entries(cart).map(([id, qty]) => ({
    id,
    qty,
  }));

  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold m-4">Cart</h1>
      <ul>
        {cartArray.map(({ id, qty }) => (
          <li key={id}>
            <CartItem id={id} qty={qty} />
          </li>
        ))}
      </ul>

      {cartArray.length > 0 && (
        <button
          type="button"
          onClick={clearCart}
          className="border-solid border-2 border-slate-500 px-2 rounded disabled:opacity-50"
        >
          Clear Cart
        </button>
      )}
    </div>
  );
};

export default CartPage;

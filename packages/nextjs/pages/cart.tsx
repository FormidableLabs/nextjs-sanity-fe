import { NextPage } from "next";
import Link from "next/link";
import { useCart } from "components/CartContext";
import { CartItem } from "components/CartItem";

interface Props {
  cartItems: Record<string, any>;
}

const CartPage: NextPage<Props> = (props) => {
  const { clearCart, cartItems } = useCart();

  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold my-4">Cart</h1>
      <ul className="flex flex-col gap-4">
        {cartItems.map(({ id, qty, item }) => (
          <li key={id}>
            <CartItem id={id} qty={qty} item={item} />
          </li>
        ))}
      </ul>

      {cartItems.length > 0 ? (
        <div className="flex justify-between gap-4 mt-6">
          <button
            type="button"
            onClick={clearCart}
            className="block px-6 py-2 border-solid border-2 border-slate-500 rounded"
          >
            Clear Cart
          </button>

          <Link href="/checkout">
            <a className="w-fit block px-6 py-2 border-solid border-2 border-slate-500 rounded">Checkout</a>
          </Link>
        </div>
      ) : (
        <div>
          <div className="text-xl">You have nothing in your cart</div>
          <Link href="/">
            <a className="w-fit block mt-4 px-6 py-2 border-solid  border-2 border-slate-500 rounded">View Products</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

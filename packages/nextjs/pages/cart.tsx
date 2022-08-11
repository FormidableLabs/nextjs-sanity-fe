import { NextPage } from "next";
import Link from "next/link";
import { useCart } from "components/CartContext";
import { CartItem } from "components/CartItem";

interface Props {
  cartItems: Record<string, any>;
}

const BUTTON_CLASS = "block px-6 py-2 border-solid border-2 border-slate-500 rounded";

const CartPage: NextPage<Props> = () => {
  const { cartItems, cartItemsErrorIds, retrieveCartItems, clearCart } = useCart();

  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold my-4">Cart</h1>
      {cartItemsErrorIds ? (
        <div>
          <p>Error retrieving cart items: {cartItemsErrorIds.join(", ")}</p>
          <button type="button" onClick={retrieveCartItems} className={`${BUTTON_CLASS}`}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {cartItems.length > 0 ? (
            <div>
              <ul className="flex flex-col gap-4">
                {cartItems.map(({ id, qty, item }) => (
                  <li key={id}>
                    <CartItem id={id} qty={qty} item={item} />
                  </li>
                ))}
              </ul>
              <div className="flex justify-between gap-4 mt-6">
                <button type="button" onClick={clearCart} className={`${BUTTON_CLASS}`}>
                  Clear Cart
                </button>

                <Link href="/checkout">
                  <a className={`w-fit ${BUTTON_CLASS}`}>Checkout</a>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-xl">You have nothing in your cart</div>
              <Link href="/">
                <a className={`w-fit ${BUTTON_CLASS}`}>View Products</a>
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CartPage;

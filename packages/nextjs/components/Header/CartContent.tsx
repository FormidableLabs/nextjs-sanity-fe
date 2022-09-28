import * as React from "react";
import { IoIosClose } from "react-icons/io";
import { Button } from "../Button";
import { useCart } from "../CartContext";
import Link from "next/link";
import { CartItem } from "../CartItem";
import { currencyFormatter } from "../../utils/currencyFormatter";

type CartContentProps = {
  onClose: () => void;
};

export const CartContent = ({ onClose }: CartContentProps) => {
  const { isFetchingCartItems, totalCartPrice, cartItems } = useCart();

  return (
    <div className="flex-1 w-full flex flex-col text-blue p-4 gap-4">
      <div className="w-full flex justify-end items-center gap-x-1">
        <button className="gap-x-1 items-center inline-flex" onClick={onClose}>
          <span>Close</span>
          <IoIosClose size={24} />
        </button>
      </div>
      <Divider />
      <div className="flex-1 overflow-auto">
        {cartItems.length > 0 ? (
          <div>
            <ul className="flex flex-col gap-6">
              {cartItems.map(({ id, qty, item }, i) => (
                <React.Fragment key={id}>
                  <li>
                    <CartItem id={id} qty={qty} item={item} />
                  </li>
                  {i < cartItems.length - 1 && <li className="border-t-2" />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        ) : (
          <div className="py-3 flex flex-col gap-3">
            <p className="text-h6">You don't have anything in your cart.</p>
            <Link href="/products" passHref>
              <Button as="a" variant="secondary" onClick={onClose}>
                View Products
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Divider />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-h6">
          <span>Total</span>
          <span className="font-bold font-jeanLuc">
            {isFetchingCartItems ? "..." : currencyFormatter.format(totalCartPrice)}
          </span>
        </div>
        <Button variant="primary" as="button">
          Checkout
        </Button>
        <Button variant="text" as="button">
          View your cart
        </Button>
      </div>
    </div>
  );
};

const Divider = () => <div className="h-0 border-t-2 border-blue"></div>;
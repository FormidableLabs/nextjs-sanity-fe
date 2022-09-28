import * as React from "react";
import { IoIosClose } from "react-icons/io";
import { Button } from "../Button";
import { useCart } from "../CartContext";

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
      <div className="flex-1 ">TODO:</div>
      <Divider />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-h6">
          <span>Total</span>
          {/* TODO: Get this... */}
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

const currencyFormatter = Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

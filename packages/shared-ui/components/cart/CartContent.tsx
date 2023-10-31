import * as React from "react";
import { IoIosClose } from "react-icons/io";
import { Button } from "../Button/Button";
import { useCart, CartLineItem } from "./index";
import { currencyFormatter } from "../../utils/currencyFormatter";

type CartContentProps = {
  ProductListLink: JSX.Element;
};

export const CartContent = ({ ProductListLink }: CartContentProps) => {
  const { isLoading, totalPrice, cartItems, toggleCartOpen } = useCart();

  return (
    <div className="flex-1 w-full flex flex-col text-primary p-4 gap-4">
      <div className="w-full flex justify-end items-center gap-x-1">
        <button className="gap-x-1 items-center inline-flex" onClick={() => toggleCartOpen(false)}>
          <span>Close</span>
          <IoIosClose size={24} />
        </button>
      </div>
      <Divider />
      <div className="flex-1 overflow-auto">
        {cartItems.length > 0 ? (
          <div>
            <ul className="flex flex-col gap-6">
              {cartItems.map((item, i) => (
                <React.Fragment key={item._id}>
                  <li>
                    <CartLineItem item={item} />
                  </li>
                  {i < cartItems.length - 1 && <li className="border-t-2" />}
                </React.Fragment>
              ))}
            </ul>
          </div>
        ) : (
          <div className="py-3 flex flex-col gap-3">
            <p className="text-h6">You don&apos;t have anything in your cart.</p>
            {ProductListLink}
          </div>
        )}
      </div>
      <Divider />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center text-h6">
          <span>Total</span>
          <span className="font-bold font-jeanLuc">{isLoading ? "..." : currencyFormatter.format(totalPrice)}</span>
        </div>
        <Button variant="primary" as="button" onClick={notifyWeDontSellBread}>
          Checkout
        </Button>
        <Button variant="text" as="button" onClick={notifyWeDontSellBread}>
          View your cart
        </Button>
      </div>
    </div>
  );
};

const Divider = () => <div className="h-0 border-t-2 border-primary"></div>;

const notifyWeDontSellBread = () =>
  alert("Sorry, we don't actually sell bread 😅 This button doesn't actually do anything.");

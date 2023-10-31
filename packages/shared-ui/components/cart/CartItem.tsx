import * as React from "react";
import { IoMdClose } from "react-icons/io";
import { useCart, CartItem as CartItemType } from "./CartContext";
import { Input } from "../Input";
import { currencyFormatter } from "../../utils/currencyFormatter";

type CartItemProps = {
  item: CartItemType;
};

export const CartLineItem = ({ item }: CartItemProps) => {
  const { updateCart } = useCart();
  const [desiredQty, setDesiredQty] = React.useState(item.quantity);

  const updateQty = React.useCallback(
    (value: number) => {
      updateCart({ _id: item._id, quantity: value });
    },
    [updateCart]
  );

  React.useEffect(() => {
    if (desiredQty === 0 || desiredQty === item.quantity) return;

    const id = setTimeout(() => {
      updateQty(desiredQty);
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [desiredQty]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="text-h6">{item.name}</h6>
        </div>
        <h6 className="text-h6 font-bold font-jeanLuc">{currencyFormatter.format(item.quantity * item.price)}</h6>
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-16">
          <Input
            value={desiredQty}
            name="amount"
            type="number"
            placeholder="1"
            min={1}
            max={100}
            step={1}
            onChange={(evt) => {
              const amt = evt.target.valueAsNumber;
              setDesiredQty(amt);
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => {
            updateQty(0);
          }}
          aria-label="Delete item"
          className="p-1 rounded"
        >
          <IoMdClose size={32} />
        </button>
      </div>
    </div>
  );
};

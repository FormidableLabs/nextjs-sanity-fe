import * as React from "react";
import { IoMdClose } from "react-icons/io";
import { Input } from "shared-ui";
import { currencyFormatter } from "utils/currencyFormatter";
import { CartItem as CartItemType, useCart } from "./CartContext";

type CartItemProps = {
  item: CartItemType;
};

export const CartItem = ({ item }: CartItemProps) => {
  const { updateCart } = useCart();
  const [desiredQty, setDesiredQty] = React.useState(item.qty);

  const updateQty = React.useCallback(
    (value: number) => {
      updateCart(item._id, value);
    },
    [updateCart]
  );

  React.useEffect(() => {
    if (desiredQty === 0 || desiredQty === item.qty) return;

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
          <h6 className="text-h6">{item.variantInfo.name}</h6>
        </div>
        <h6 className="text-h6 font-bold font-jeanLuc">
          {currencyFormatter.format(item.qty * item.variantInfo.price)}
        </h6>
      </div>
      <div className="flex gap-2 items-center">
        <div className="w-16">
          <Input
            value={desiredQty}
            name="amount"
            type="number"
            placeholder="1"
            min={0}
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

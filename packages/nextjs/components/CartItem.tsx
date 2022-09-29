import * as React from "react";
import { IoMdClose } from "react-icons/io";
import { useCart } from "./CartContext";
import { CategoryPageProduct } from "utils/groqTypes";
import { currencyFormatter } from "../utils/currencyFormatter";
import { Input } from "./Input";

type CartItemProps = {
  id: string;
  item: CategoryPageProduct;
  qty: number;
};

export const CartItem: React.FC<CartItemProps> = ({ id, item, qty }) => {
  const { updateCart } = useCart();
  const [desiredQty, setDesiredQty] = React.useState(qty);

  const updateQty = React.useCallback(
    (value: number) => {
      updateCart(id, value);
    },
    [updateCart]
  );

  React.useEffect(() => {
    if (desiredQty === 0) return;

    const id = setTimeout(() => {
      updateQty(desiredQty);
    }, 500);

    return () => {
      clearTimeout(id);
    };
  }, [desiredQty]);

  const variantDescription = item.variants.map((variant) => variant.name).join(", ");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <h6 className="text-h6">{item.name}</h6>
          <div>{variantDescription}</div>
        </div>
        <h6 className="text-h6 font-bold font-jeanLuc">{currencyFormatter.format(qty * item.price)}</h6>
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

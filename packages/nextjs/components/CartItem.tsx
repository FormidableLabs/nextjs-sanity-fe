import * as React from "react";
import { HiMinusSm, HiPlusSm, HiOutlineTrash } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { useCart } from "./CartContext";
import { Image } from "./Image";
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

  const updateQty = (value: number) => {
    updateCart(id, value);
  };

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

  return (
    <div className="flex flex-wrap gap-8 py-8">
      <div className="w-24 aspect-square bg-slate-100 flex-none" style={{ lineHeight: 0 }}>
        {item?.images && <Image width={96} height={96} src={item.images} alt={item?.imageAlt ?? item.name} />}
      </div>
      <div className="flex-auto">
        <div>{item.name}</div>
        {/* Quantity */}
        <div className="flex gap-2 mt-2">
          <div className="flex border-solid border-2 border-slate-500 divide-x rounded">
            <button
              type="button"
              onClick={() => {
                updateQty(qty - 1);
              }}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="px-1 disabled:opacity-50"
            >
              <HiMinusSm />
            </button>
            <div className="w-8 px-1 text-center">{qty}</div>
            <button
              type="button"
              onClick={() => {
                updateQty(qty + 1);
              }}
              aria-label="Increase quantity"
              className="px-1"
            >
              <HiPlusSm />
            </button>
          </div>
          <button
            type="button"
            onClick={() => {
              updateQty(0);
            }}
            aria-label="Delete item"
            className="px-1 border-solid border-2 border-slate-500 rounded"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
      <div>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price * qty)}</div>
    </div>
  );
};

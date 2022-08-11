import { HiMinusSm, HiPlusSm, HiOutlineTrash } from "react-icons/hi";
import { useCart } from "./CartContext";
import { Image } from "./Image";
import { Product } from "utils/groqTypes";

type CartItemProps = {
  id: string;
  item: Product;
  qty: number;
};

export const CartItem: React.FC<CartItemProps> = ({ id, item, qty }) => {
  const { updateCart } = useCart();

  const updateQty = (value: number) => {
    updateCart(id, value);
  };

  return (
    <div className="flex gap-8 py-4">
      <div className="w-24 aspect-square bg-slate-100">
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
                updateQty(-1);
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
                updateQty(1);
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

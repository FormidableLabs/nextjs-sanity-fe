import { HiMinusSm, HiPlusSm, HiOutlineTrash } from "react-icons/hi";
import { useCart } from "./CartContext";

type CartItemProps = {
  id: string;
  qty: number;
};

export const CartItem: React.FC<CartItemProps> = ({ id, qty }) => {
  const { updateCart } = useCart();

  const updateQty = (value: number) => {
    updateCart(id, value);
  };

  return (
    <div className="flex gap-4">
      {/* TODO: get product name */}
      <div>id: {id}</div>
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
  );
};

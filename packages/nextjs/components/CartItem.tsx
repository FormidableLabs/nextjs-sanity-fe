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
      <div className="grid grid-cols-3 border-solid border-2 border-slate-500 divide-x">
        <button
          type="button"
          onClick={() => {
            updateQty(-1);
          }}
          disabled={qty <= 1}
          aria-label="Decrease quantity"
          className="w-6 disabled:opacity-50"
        >
          -
        </button>
        <div className="w-6 text-center">{qty}</div>
        <button
          type="button"
          onClick={() => {
            updateQty(1);
          }}
          aria-label="Increase quantity"
          className="w-6"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          updateQty(0);
        }}
      >
        Delete
      </button>
    </div>
  );
};

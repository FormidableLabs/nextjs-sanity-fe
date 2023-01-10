import { FiPlus } from "react-icons/fi";
import { Button } from "components/Button";
import { Input } from "components/Input";
import { H6 } from "components/Typography/H6";

interface Props {
  quantity: string;
  onQuantityChange: (quantity: string) => void;
  onAddToCart: () => void;
}

export const QuantityInput = ({ quantity, onQuantityChange, onAddToCart }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <H6>Quantity</H6>
      <div className="flex items-center">
        <div className="w-20 mr-4">
          <Input
            min={1}
            type="number"
            value={quantity}
            onChange={(e) => onQuantityChange(e.target.value)}
            placeholder="1"
            inputClassName="w-full"
          />
        </div>
        <Button variant="primary" className="flex items-center" onClick={onAddToCart}>
          <FiPlus size={20} className="mr-2" /> Add to cart
        </Button>
      </div>
    </div>
  );
};

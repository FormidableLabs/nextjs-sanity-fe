interface Props {
  msrp: number;
  price: number;
}

export const Price: React.FC<Props> = ({ msrp, price }) => {
  if (price !== msrp) {
    return (
      <span className="flex gap-x-2">
        <h4 className="text-h6 font-bold text-red line-through">${msrp ?? 0}</h4>
        <h4 className="text-h6 font-bold text-green-600">${price ?? 0}</h4>
      </span>
    );
  }

  return <h4 className="text-h6 font-bold">$ {price ?? 0}</h4>;
};

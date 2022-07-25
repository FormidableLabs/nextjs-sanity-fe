interface Props {
  msrp: number;
  price: number;
}

export const Price: React.FC<Props> = ({ msrp, price }) => {
  if (price !== msrp) {
    return (
      <>
        <h4 className="text-xl font-bold text-red-500 line-through">$ {msrp ?? 0}</h4>
        <h4 className="text-xl font-bold text-green-600">$ {price ?? 0}</h4>
      </>
    );
  }

  return <h4 className="text-xl font-bold">$ {price ?? 0}</h4>;
};

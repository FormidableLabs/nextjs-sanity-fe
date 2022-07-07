import { Card } from "../components/Card";

const ALL_PRODUCTS = [
  "Pants",
  "Yoga Pants",
  "Shorts",
  "Shirt",
  "Yoga Shirt",
  "Socks",
  "Yoga Socks",
  "Yoga Shoes",
  "Accessories",
  "Yoga Accessories",
  "Clothing",
  "Yoga Clothing",
  "Shoes",
];

const Products = () => {
  return (
    <div className="h-full mb-4">
      <h1 className="text-2xl font-bold m-4">Products</h1>
      <div className="flex mx-4 h-full">
        <div className="min-w-[350px]">
          <h2>Filters</h2>
        </div>
        <div className="flex-1 flex flex-wrap">
          {ALL_PRODUCTS.map((product) => (
            <Card className="m-2" key={product} to={`/products/${product}`}>
              {product}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

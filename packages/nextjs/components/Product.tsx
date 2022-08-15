import Link from "next/link";
import { CategoryPageProduct } from "utils/groqTypes";
import { Image } from "./Image";
import { Price } from "./Price";

export const Product = ({ item }: { item: CategoryPageProduct }) => (
  <div className="w-26 h-fit m-4">
    <Link href={`/products/${item.slug.current}`}>
      <a>
        <Image width={300} height={300} className="rounded shadow" src={item.images} alt={item.imageAlt} />
      </a>
    </Link>
    <Link href={`/products/${item.slug.current}`}>
      <a className="flex justify-between mt-4">
        <h3 className="text-xl font-bold">{item.name}</h3>
        <Price msrp={item.msrp} price={item.price} />
      </a>
    </Link>
  </div>
);

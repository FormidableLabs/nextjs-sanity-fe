import { motion } from "framer-motion";
import Link from "next/link";
import { Image } from "./Image";
import { Price } from "./Price";
import { PLPVariant } from "../utils/groqTypes/ProductList";

export const Product = ({ item }: { item: PLPVariant }) => {
  const href = {
    pathname: `/products/${item.productSlug}`,
    query: {
      variant: item.slug,
    },
  };

  return (
    <motion.div className="flex flex-col gap-3 group" layoutId={item._id}>
      <Link href={href} passHref>
        <a className="group-hover:shadow-lg rounded-lg overflow-hidden transition transition-shadow duration-150">
          <Image width={600} height={600} src={item.images} alt={item.imageAlt} layout="responsive" />
        </a>
      </Link>
      <Link href={href} passHref>
        <a className="text-blue">
          <h3 className="text-h6 mb-1">{item.name}</h3>
          <Price msrp={item.msrp} price={item.price} />
        </a>
      </Link>
    </motion.div>
  );
};

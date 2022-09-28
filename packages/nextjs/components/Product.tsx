import { motion } from "framer-motion";
import Link from "next/link";
import { CategoryPageProduct } from "utils/groqTypes";
import { Image } from "./Image";
import { Price } from "./Price";

export const Product = ({ item }: { item: CategoryPageProduct }) => (
  <motion.div className="flex flex-col gap-3 group" layoutId={item._id}>
    <Link href={`/products/${item.slug.current}`} passHref>
      <a className="group-hover:shadow-lg rounded-lg overflow-hidden transition transition-shadow duration-150">
        <Image width={600} height={600} src={item.images} alt={item.imageAlt} layout="responsive" />
      </a>
    </Link>
    <Link href={`/products/${item.slug.current}`} passHref>
      <a className="text-blue">
        <h3 className="text-h6 mb-1">{item.name}</h3>
        <Price msrp={item.msrp} price={item.price} />
      </a>
    </Link>
  </motion.div>
);

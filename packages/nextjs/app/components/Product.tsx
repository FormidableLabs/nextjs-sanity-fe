import Link from "next/link";
import { Price } from "../ui/shared-ui";
import { PLPVariant } from "utils/groqTypes/ProductList";
import { Image } from "./Image";

type Props = {
  item: PLPVariant;
  priorityImage?: boolean;
};

export const Product = ({ item, priorityImage }: Props) => {
  const href = {
    pathname: `/products/${item.productSlug}`,
    query: {
      variant: item.slug,
    },
  };

  return (
    <div className="flex flex-col gap-3 group">
      <Link href={href} className="group-hover:shadow-lg rounded-lg overflow-hidden transition-shadow duration-150">
        <Image
          priority={priorityImage}
          width={600}
          height={600}
          src={item.images}
          alt={item.name}
          className="aspect-square"
        />
      </Link>
      <Link href={href} className="text-primary">
        <h3 className="text-h6 mb-1">{item.name}</h3>
        <Price msrp={item.msrp} price={item.price} />
      </Link>
    </div>
  );
};

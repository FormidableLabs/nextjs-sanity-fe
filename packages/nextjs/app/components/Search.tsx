import * as React from "react";
import Link from "next/link";
import { q, sanityImage } from "groqd";
import { runQuery } from "utils/sanityClient";
import { Image } from "./Image";
import { Search as BaseSearch } from "shared-ui";

const searchSelection = {
  _id: q.string(),
  name: q.string(),
  slug: q.slug("slug"),
  image: sanityImage("images", { isList: true }).slice(0),
  productSlug: q("*").filter('_type == "product" && references(^._id)').slice(0).grabOne$("slug.current", q.string()),
};

const searchQuery = (query: string) =>
  runQuery(
    q("*")
      .filterByType("variant")
      .filter(`name match $query + "*"`)
      .order("_score desc")
      .slice(0, 5)
      .grab$(searchSelection),
    { query }
  );

export const Search: React.FC = () => {
  return (
    <BaseSearch
      onSearch={(searchTerm = "") => searchQuery(searchTerm.trim())}
      itemToString={(item) => item?.name || ""}
      getKey={(item) => item._id}
      renderItem={(variant, clearSearch) => (
        <Link
          href={{ pathname: `/products/${variant.productSlug}`, query: { variant: variant.slug } }}
          className="flex items-center"
          onClick={clearSearch}
        >
          <Image className="rounded" src={variant.image} width={50} height={50} alt={variant.slug} />
          <span className="text-body-reg font-medium text-primary ml-4">{variant.name}</span>
        </Link>
      )}
    />
  );
};

import groq from "groq";
import type { CategoryPageCategory } from "./groqTypes";
import { getFilterGroupOptionsSort } from "./getFilterGroupOptionsSort";
import { sanityClient } from "./sanityClient";

export const generateDynamicFilterGroups = async (category: CategoryPageCategory) => {
  const { slug, variantFilters } = category;

  const queryOptions = {
    slug: slug.current,
  };

  const fetchRequests = variantFilters.map(({ variantsMap }) =>
    sanityClient.fetch(
      groq`{
      'allProductVariants': *[_type == "product" && $slug in categories[]->slug.current] {
        'variants': variants[]->${variantsMap}
      },
    }`,
      queryOptions
    )
  );

  const variantFiltersWithResponses = (await Promise.all(fetchRequests)).map((response, index) => {
    const { value, label, type, variantsMap } = variantFilters[index];
    const result = response.allProductVariants as { variants: string[] }[];
    return { value, label, type, variantsMap, result };
  });

  const dynamicFilterGroups = variantFiltersWithResponses.map(({ value, label, type, variantsMap, result }) => {
    const options = result
      .map(({ variants }) => variants)
      .reduce((acc, curr) => {
        const newAcc = [...acc];
        curr.forEach((variant) => {
          if (!newAcc.includes(variant)) {
            newAcc.push(variant);
          }
        });
        return newAcc;
      }, [])
      .sort(getFilterGroupOptionsSort(type))
      .map((value) => ({
        value,
        label: value,
        filter: `'${value}' in variants[]->${variantsMap}`,
      }));
    return { value, label, options };
  });

  return dynamicFilterGroups;
};

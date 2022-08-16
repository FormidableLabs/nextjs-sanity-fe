import type { CategoryPageCategory, CategoryPageAllProductVariantsResult } from "./groqTypes";

import groq from "groq";
import { getFilterGroupOptionsSort } from "./getFilterGroupOptionsSort";
import { sanityClient } from "./sanityClient";

export const generateDynamicFilterGroups = async (category: CategoryPageCategory) => {
  const { slug, variantFilters } = category;

  const queryOptions = {
    slug: slug.current,
  };

  // Create array of product variant fetch requests for each variantFilter in CMS
  const fetchRequests = variantFilters.map(({ variantsMap }) =>
    sanityClient.fetch(
      groq`{
      'products': *[_type == "product" && $slug in categories[]->slug.current] {
        'variants': variants[]->${variantsMap}
      },
    }`,
      queryOptions
    )
  );

  const fetchResponses: CategoryPageAllProductVariantsResult[] = await Promise.all(fetchRequests);

  const variantFiltersWithResponses = fetchResponses.map((response, index) => {
    const { value, label, type, variantsMap } = variantFilters[index];
    const result = response.products;
    return { value, label, type, variantsMap, result };
  });

  const dynamicFilterGroups = variantFiltersWithResponses.map(({ value, label, type, variantsMap, result }) => {
    const options = result
      .map(({ variants }) => variants)
      .reduce((acc, curr) => {
        const newAcc = [...acc];
        curr.forEach((variant) => {
          if (variant && !newAcc.includes(variant)) {
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

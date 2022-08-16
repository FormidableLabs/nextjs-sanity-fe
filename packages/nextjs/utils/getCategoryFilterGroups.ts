import type { CategoryPageResult } from "utils/groqTypes";

import { generateDynamicFilterGroups } from "utils/generateDynamicFilterGroups";
import { STATIC_FILTER_GROUPS } from "constants/filters";

export const getCategoryFilterGroups = async (category: CategoryPageResult["category"]) => {
  // Generate dynamic filter groups
  const dynamicFilterGroups = await generateDynamicFilterGroups(category);
  // Append dynamic and static filter groups
  return [...dynamicFilterGroups, ...STATIC_FILTER_GROUPS];
};

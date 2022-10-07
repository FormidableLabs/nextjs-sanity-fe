import { Sdk } from "utils/generated/graphql-mock-types";
import { getMockData } from "mocks/msw/db/mock-data";

export const CategoryQueries: Pick<Sdk, "getCategories" | "getCategoriesSlugs"> = {
  async getCategories() {
    return {
      allCategory: getMockData().categories,
    };
  },
  async getCategoriesSlugs() {
    return {
      allCategory: getMockData().categories,
    };
  },
};

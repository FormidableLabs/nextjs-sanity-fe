import { Sdk } from "utils/generated/graphql-mock-types";
import { getMockData } from "mocks/msw/db/db";

export const ProductsQueries: Pick<Sdk, "getProducts" | "getProductAndRecommendations"> = {
  async getProducts(variables, requestHeaders) {
    const mockData = getMockData();
    return {
      allProduct: mockData.products,
    };
  },
  async getProductAndRecommendations(variables, requestHeaders) {
    const mockData = getMockData();
    return {
      allProduct: mockData.products.filter((p) => p.slug !== variables.slug),
      recommendations: mockData.products.filter((p) => p.slug !== variables.slug),
    };
  },
};

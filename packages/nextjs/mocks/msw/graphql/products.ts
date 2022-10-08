import { Sdk } from "utils/generated/graphql-mock-types";
import { getMockData } from "../db/mock-data";

export const ProductsQueries: Pick<
  Sdk,
  "getProducts" | "getProductAndRecommendations" | "getProductsAndCategories" | "getProductsSlugs"
> = {
  async getProducts() {
    const mockData = getMockData();
    return {
      allProduct: mockData.products,
    };
  },
  async getProductAndRecommendations({ slug }) {
    const mockData = getMockData();
    return {
      allProduct: mockData.products.filter((p) => p.slug !== slug),
      recommendations: mockData.products.filter((p) => p.slug !== slug),
    };
  },

  async getProductsAndCategories() {
    const mockData = getMockData();
    return {
      allProduct: mockData.products,
      allCategory: mockData.categories,
      allProductImage: mockData.products.flatMap((p) => p.images).filter((x): x is NonNullable<any> => !!x),
    };
  },

  async getProductsSlugs() {
    const mockData = getMockData();
    return {
      allProduct: mockData.products,
    };
  },
};

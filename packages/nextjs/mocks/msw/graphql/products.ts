import faker from "faker";
import { Sdk } from "utils/generated/graphql-mock-types";
import { getMockData } from "../db/mock-data";

export const ProductsQueries: Pick<
  Sdk,
  "getProducts" | "getProductAndRecommendations" | "getProductsAndCategories" | "getProductsSlugs"
> = {
  async getProducts() {
    const mockData = await getMockData();
    return {
      allProduct: mockData.products,
    };
  },
  async getProductAndRecommendations({ slug }) {
    const mockData = await getMockData();
    return {
      allProduct: mockData.products.filter((p) => p.slug !== slug),
      recommendations: mockData.products.filter((p) => p.slug !== slug),
    };
  },

  async getProductsAndCategories() {
    const mockData = await getMockData();
    return {
      allProduct: mockData.products.slice(0, 3),
      allCategory: mockData.categories.slice(0, 2),
    };
  },

  async getProductsSlugs() {
    const mockData = await getMockData();
    return {
      allProduct: mockData.products,
    };
  },
};

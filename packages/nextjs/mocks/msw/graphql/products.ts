import { Sdk } from "utils/generated/graphql-mock-types";
import { getMockData } from "../db/mock-data";
import faker from "faker";

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
    const allImages = mockData.products.flatMap((p) => p.images).filter((x): x is NonNullable<typeof x> => !!x);
    return {
      allProduct: mockData.products.slice(0, 3),
      allCategory: mockData.categories.slice(0, 2),
      allProductImage: [faker.random.arrayElement(allImages)],
    };
  },

  async getProductsSlugs() {
    const mockData = getMockData();
    return {
      allProduct: mockData.products,
    };
  },
};

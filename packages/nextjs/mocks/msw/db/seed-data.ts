import { mock } from "mocks/factory";

/**
 * Generate some random mock data
 */
export function seedMockData() {
  const categories = mock.categories(5);
  const products = mock.products(40, categories);
  return {
    products,
    categories,
  };
}

export type MockData = ReturnType<typeof seedMockData>;

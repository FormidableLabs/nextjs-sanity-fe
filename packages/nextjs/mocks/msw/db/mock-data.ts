import { mock } from "mocks/factory";

export type MockData = ReturnType<typeof generateMockData>;

let mockData: null | MockData;

/**
 * Retrieves the mock data.
 * Seeds if necessary.
 */
export function getMockData() {
  if (!mockData) {
    mockData = generateMockData();
  }
  return mockData;
}

/**
 * Sets the mock data
 */
export function setMockData(newMockData: Partial<MockData>) {
  Object.assign(getMockData(), newMockData);
}

/**
 * Generate some random mock data
 */
export function generateMockData() {
  const categories = mock.categories(5);
  const products = mock.products(40, categories);
  return {
    products,
    categories,
  };
}

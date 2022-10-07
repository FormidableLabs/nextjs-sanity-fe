import { mock } from "mocks/factory";
import faker from "faker";

type MockData = ReturnType<typeof generateMockData>;

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
  const categories = mock.array(5, () => mock.category({}));
  const products = mock.array(40, () =>
    mock.product({
      categories: faker.random.arrayElements(categories, faker.datatype.number({ min: 1, max: 3 })),
    })
  );

  return {
    products,
    categories,
  };
}

import { mock } from "mocks/factory";

type MockData = ReturnType<typeof generateMockData>;

let mockData: null | MockData;

export function getMockData() {
  if (!mockData) {
    mockData = generateMockData();
  }
  return mockData;
}

export function seedMockData(newMockData: Partial<MockData>) {
  mockData = Object.assign(generateMockData(), newMockData);
}

function generateMockData() {
  const products = mock.array(40, () => mock.product({}));
  const categories = mock.array(5, () => mock.category({}));

  return {
    products,
    categories,
  };
}

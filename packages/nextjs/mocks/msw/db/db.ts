import { mock } from "mocks/factory";
import faker from "faker";

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

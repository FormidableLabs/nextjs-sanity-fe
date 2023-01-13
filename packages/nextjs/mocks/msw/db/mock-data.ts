import { mock } from "mocks/factory";
import { Storage } from "./storage";

const storage = new Storage<MockData>();

/**
 * Retrieves the mock data.
 * Seeds if necessary.
 */
export async function getMockData(): Promise<MockData> {
  let mockData = await storage.readData();

  if (!mockData) {
    mockData = generateMockData();
    const expires = Date.now() + 300_000;
    await storage.storeData(mockData, expires);
  }
  return mockData;
}

/**
 * Sets the mock data
 */
export async function setMockData(newMockData: Partial<MockData>): Promise<void> {
  const mockData = await getMockData();
  Object.assign(mockData, newMockData);

  const expires = Date.now() + 30_000;
  await storage.storeData(mockData, expires);
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
export type MockData = ReturnType<typeof generateMockData>;

import { Storage } from "./storage";
import { seedMockData, MockData } from "mocks/msw/db/seed-data";

export type { MockData }; // For convenience

const storage = new Storage<MockData>();

/**
 * Retrieves the mock data.
 * Seeds if necessary.
 */
export async function getMockData(): Promise<MockData> {
  let mockData = await storage.readData();

  if (!mockData) {
    mockData = seedMockData();
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

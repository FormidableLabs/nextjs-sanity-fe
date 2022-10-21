import { Storage } from "./storage";
import { seedMockData, MockData } from "mocks/msw/db/seed-data";

export type { MockData }; // For convenience

const storage = new Storage<MockData>();

/**
 * Retrieves the mock data.
 * Seeds if necessary.
 */
export function getMockData(): MockData {
  let mockData = storage.readData();

  if (!mockData) {
    mockData = seedMockData();
    const expires = Date.now() + 300_000;
    storage.storeData(mockData, expires);
  }
  return mockData;
}

/**
 * Sets the mock data
 */
export function setMockData(newMockData: Partial<MockData>) {
  const mockData = getMockData();
  Object.assign(mockData, newMockData);

  const expires = Date.now() + 30_000;
  storage.storeData(mockData, expires);
}

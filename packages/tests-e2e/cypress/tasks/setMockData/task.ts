import { setMockData, MockData } from "mocks/msw/db/mock-data";

export function setMockDataTask(mockData: Partial<MockData>) {
  setMockData(mockData);

  return null; // Required by cypress
}

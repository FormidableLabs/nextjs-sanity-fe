import { mock } from "mocks/factory";

export type MockData = ReturnType<typeof generateMockData>;

/**
 * Retrieves the mock data.
 * Seeds if necessary.
 */
export function getMockData(): MockData {
  let mockData = storage.readData();

  if (!mockData) {
    mockData = generateMockData();
    storage.storeData(mockData, Date.now() + 300_000);
  }
  return mockData;
}

/**
 * Sets the mock data
 */
export function setMockData(newMockData: Partial<MockData>) {
  const mockData = getMockData();
  storage.storeData(Object.assign(mockData, newMockData), Date.now() + 30_000);
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

/* eslint-disable @typescript-eslint/no-var-requires */

const Storage =
  typeof window === "undefined"
    ? class NodeStorage<TData> {
        /**
         * Normally, we'd just store this data in a variable in memory.
         * However, with `next dev`, pages and api modules are running in isolation.
         * So, we must share this data via a temporary file instead.
         */
        tempFile = require("path").join(process.cwd(), "./mocks/msw/db/mock-data.temp.json");
        storeData(data: TData, expires: number) {
          const serialized = JSON.stringify({ data, expires });
          require("fs").writeFileSync(this.tempFile, serialized);
          console.log("SAVED FILE ", this.tempFile);
        }
        readData(): TData | null {
          try {
            const serialized = require("fs").readFileSync(this.tempFile, "utf8");
            const { data, expires } = JSON.parse(serialized);
            if (Date.now() >= expires) {
              console.log("[mock-data] Data expired and cleared");
              return null;
            }

            console.log("READ FILE ", this.tempFile);

            return data as unknown as TData;
          } catch (err) {
            console.log("ERROR READING FILE ", this.tempFile);
            return null;
          }
        }
      }
    : class BrowserStorage<TData> {
        data: TData | null = null;
        storeData(data: TData, expires: number) {
          this.data = data;
        }
        readData(): TData | null {
          return this.data;
        }
      };
const storage = new Storage<MockData>();

import * as JSON from "flatted"; // Supports circular references

/* eslint-disable @typescript-eslint/no-var-requires */
export const Storage =
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
    : /**
       * Simply stores the data in memory
       */
      class BrowserStorage<TData> {
        data: TData | null = null;
        storeData(data: TData, expires: number) {
          this.data = data;
        }
        readData(): TData | null {
          return this.data;
        }
      };

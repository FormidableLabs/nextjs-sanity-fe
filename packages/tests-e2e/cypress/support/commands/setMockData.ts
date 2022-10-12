import { MockData, setMockData } from "mocks/msw/db/mock-data";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    export interface Chainable<Subject = any> {
      /**
       * Sets the mock data on the client and server
       */
      setMockData(mockData: Partial<MockData>): Chainable<void>;
    }
  }
}

Cypress.Commands.add("setMockData", (mockData: Partial<MockData>) => {
  throw new Error("[setMockData] It's currently broken, because 'next dev' keeps a separate module cache");
  // Set the data on the client:
  setMockData(mockData);
  // And on the server:
  cy.request("PUT", "/api/e2e-tests/mocks", mockData);
});

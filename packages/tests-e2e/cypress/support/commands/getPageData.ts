import type { PageDataTypes } from "../../../../nextjs/pages/api/e2e-tests/page-data/[page]";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    export interface Chainable<Subject = any> {
      /**
       *
       */
      getPageData<TPage extends keyof PageDataTypes>(page: TPage): Chainable<PageDataTypes[TPage]>;
    }
  }
}

Cypress.Commands.add("getPageData", (page: keyof PageDataTypes) => {
  return cy.request("GET", `/api/e2e-tests/page-data${page}`).then((res) => {
    return res.body;
  });
});

import type { InterceptSSRConfig, InterceptSSRResult } from "./task";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    export interface Chainable<Subject = any> {
      /**
       * Intercepts HTTP requests on the server-side
       */
      interceptSSR(url: string, staticResponse: unknown): Chainable<InterceptSSRResult>;
    }
  }
}

Cypress.Commands.add("interceptSSR", (url: string, staticResponse: unknown) => {
  const config: InterceptSSRConfig = { url, staticResponse };
  return cy.task("interceptSSR", config, { log: false });
});

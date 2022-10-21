export {};
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    export interface Chainable<Subject = any> {
      /**
       * Finds the closest matching element that comes after this element or its ancestors.
       * @example
       * <div><h2>My Element</h2></div>
       * <section>...</section>
       *
       * cy.get('h2').nextClosest('section') // <section>...</section>
       */
      nextClosest(selector: JQuery.Selector): Chainable<JQuery>;
    }
  }
}

Cypress.Commands.add("nextClosest", { prevSubject: "element" }, (subject, selector) => {
  let result: JQuery;
  do {
    result = subject.nextAll(selector).first();
    subject = subject.parent();
  } while (!result.length && subject.length);

  return cy.wrap(result);
});

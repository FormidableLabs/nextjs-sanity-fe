describe("when I visit the about page", () => {
  before(() => {
    cy.visit("/about");
  });
  it('I see the "Welcome" tag line', () => {
    cy.findByText("Welcome to the NextJS Sanity Ecommerce Demo Site!").should("exist");
  });
});

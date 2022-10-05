describe("about page", () => {
  before(() => {
    cy.visit("/about");
  });
  it("should load the about page with a tag line", () => {
    cy.findByText("Welcome to the NextJS Sanity Ecommerce Demo Site!").should("exist");
  });
});

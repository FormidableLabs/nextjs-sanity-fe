describe("products page", () => {
  before(() => {
    cy.visit("/products");
  });

  it("should load the products page", () => {
    cy.findAllByText("Products").should("exist");
  });
  it("should have a sidebar with filters and sorts", () => {
    cy.findByText("Sort by");
    cy.findByText("Filters");
    cy.findByText("Flavour");
    cy.findByText("Style");
    cy.findByText("Promotion");
  });
});

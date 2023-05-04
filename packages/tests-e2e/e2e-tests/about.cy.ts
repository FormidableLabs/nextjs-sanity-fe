describe("when I visit the about page", () => {
  before(() => {
    cy.visit("/about");
  });
  it('I see the "Welcome" tag line', () => {
    cy.findByText("Learn more about the Formidable Ecommerce demo site").should("exist");
  });
});

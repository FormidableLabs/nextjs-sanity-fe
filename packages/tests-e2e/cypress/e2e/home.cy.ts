describe("home page", () => {
  before(() => {
    cy.visit("/");
  });
  it("should load the home page with a tag line", () => {
    cy.findByText("Formidable breads for your daily life.").should("exist");
    cy.findByText("INVALID TEXT").should("not.exist");
  });
  it('should show "Our Bestsellers" section', async () => {
    cy.findByText("Our bestsellers");
    cy.findByText("Show all breads");
  });
  it('should show "Top Categories" section', async () => {
    cy.findByText("Top categories");
  });
});

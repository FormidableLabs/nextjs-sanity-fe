describe("home page", () => {
  before(() => {
    cy.visit("/");
  });
  it("should load the home page with a tag line", () => {
    cy.findByText("Formidable breads for your daily life.").should("exist");
    cy.findByText("INVALID TEXT").should("not.exist");
  });
});

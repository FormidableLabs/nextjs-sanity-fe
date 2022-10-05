describe("when I visit the home page", () => {
  before(() => {
    cy.visit("/");
  });
  it('I see the tag line "Formidable breads ..."', () => {
    cy.findByText("Formidable breads for your daily life.").should("exist");
    cy.findByText("INVALID TEXT").should("not.exist");
  });
  it('I see the "Our Bestsellers" section', async () => {
    cy.findByText("Our bestsellers");
    cy.findByText("Show all breads");
  });
  it('I see the "Top Categories" section', async () => {
    cy.findByText("Top categories");
  });
});

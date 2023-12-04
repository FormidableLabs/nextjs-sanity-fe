describe("when I visit the home page", () => {
  before(() => {
    cy.visit("/");
  });
  it('I see the tag line "Formidable breads ..."', () => {
    cy.findByText("Formidable breads for your daily life.").should("exist");
    cy.findByText("INVALID TEXT").should("not.exist");
  });
  it('I see the "Our Bestsellers" section with 3 products', () => {
    cy.findByText("Our bestsellers")
      .should("exist")
      .scrollIntoView()
      .nextClosest("section")
      .within(() => {
        cy.findByText("Show all breads").should("exist");
        const bestSellers = ["Kouign Amann", "Sourdough Loaf", "Pain au Chocolat"];
        for (const product of bestSellers) {
          cy.findByText(product).should("exist");
        }
      });
  });
  it('I see the "Top Categories" section with 3 categories', () => {
    cy.findByText("Top categories")
      .should("exist")
      .nextClosest("section")
      .within(() => {
        const categories = ["Delectable Donuts", "Palatable Pastries", "Love Loaves"];
        cy.get('[data-testid="featured-list-item"]').should("have.length", 3);
        for (const category of categories) {
          cy.findByText(category).should("exist");
        }
      });
  });
});

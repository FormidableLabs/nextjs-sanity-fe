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
        cy.getServerSideProps("/home").then((data) => {
          const bestSellers = data.allProduct;
          expect(bestSellers).to.have.length(3);
          for (const product of bestSellers) {
            cy.findByText(product.name!).should("exist");
          }
        });
      });
  });
  it('I see the "Top Categories" section with 2 categories', () => {
    cy.findByText("Top categories")
      .should("exist")
      .nextClosest("section")
      .within(() => {
        cy.getServerSideProps("/home").then((data) => {
          const categories = data.allCategory;
          expect(categories).to.have.length(2);
          for (const category of categories) {
            cy.findByText(category.name!).should("exist");
          }
        });
      });
  });
});

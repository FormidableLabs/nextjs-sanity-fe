describe(`when I visit the "Categories" page`, () => {
  before(() => {
    cy.visit("/categories");
  });
  it("I see 3 categories on the page (via getPageData)", () => {
    cy.getPageData("/categories").then((data) => {
      const categories = data!.allCategory;

      expect(categories).to.have.length(3);
      categories.forEach((cat) => {
        expect(cat.name).to.not.be.empty;
        cy.findByText(cat.name!).should("exist");
      });
    });
  });
  it("I see 3 categories on the page (via getServerSideProps)", () => {
    cy.getServerSideProps("/categories").then((data) => {
      const categories = data.allCategory;

      expect(categories).to.have.length(3);
      categories.forEach((cat) => {
        expect(cat.name).to.not.be.empty;
        cy.findByText(cat.name!).should("exist");
      });
    });
  });
});

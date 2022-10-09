describe("categories page (no mocks)", () => {
  before(() => {
    cy.visit("/categories");
  });
  it("should have 3 categories on the page", () => {
    cy.getPageData("/categories").then((data) => {
      const categories = data.categories!.allCategory;

      expect(categories).to.have.length(3);
      categories.forEach((cat) => {
        expect(cat.name).to.not.be.empty;
        cy.findByText(cat.name!).should("exist");
      });
    });
  });
});

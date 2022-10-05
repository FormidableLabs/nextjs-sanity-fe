describe("categories page", () => {
  before(() => {
    cy.visit("/categories");
  });

  it("should load the categories page with a header", () => {
    cy.findAllByText("Categories").should("exist");
  });

  // Flaky test, because it depends on prod data:
  it("should have 3 top categories listed", async () => {
    const expectedCategories = ["Delectable Donuts", "Palatable Pastries", "Love Loaves"];
    expectedCategories.forEach((categoryTitle) => {
      cy.findByText("Categories").parent().findByText(categoryTitle).should("exist");
    });
  });
});

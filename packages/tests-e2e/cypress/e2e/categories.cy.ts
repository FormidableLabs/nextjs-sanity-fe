describe("when I visit the Categories page", () => {
  before(() => {
    cy.visit("/categories");
  });

  it('I see the "Categories" header', () => {
    cy.findAllByText("Categories").should("exist");
  });

  // Flaky test, because it depends on prod data:
  const expectedCategories = ["Delectable Donuts", "Palatable Pastries", "Love Loaves"];
  it(`I see the 3 top categories listed: "${expectedCategories.join('", "')}"`, async () => {
    expectedCategories.forEach((categoryTitle) => {
      cy.findByText("Categories").parent().findByText(categoryTitle).should("exist");
    });
  });
});

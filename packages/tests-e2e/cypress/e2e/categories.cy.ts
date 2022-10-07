import { mock } from "mocks/factory";

describe("categories page", () => {
  const mockCategories = [mock.category({}), mock.category({}), mock.category({})];

  before(() => {
    cy.setMockData({ categories: mockCategories });

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

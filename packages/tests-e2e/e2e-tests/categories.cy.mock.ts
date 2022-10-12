import { mock } from "mocks/factory";

describe(`when I visit the "Categories" page`, () => {
  const mockCategories = mock.array(10, () => mock.category({}));

  before(() => {
    cy.setMockData({ categories: mockCategories });

    cy.visit("/categories");
  });

  for (const category of mockCategories) {
    it(`I should see the category "${category.name}"`, () => {
      expect(category.name).to.not.be.empty;
      cy.findByText("Categories").parent().findByText(category.name!).should("exist");
    });
  }
});

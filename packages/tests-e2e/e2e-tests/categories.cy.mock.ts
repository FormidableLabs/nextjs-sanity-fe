import { mock } from "mocks/factory";

describe("categories page", () => {
  const mockCategories = mock.array(10, () => mock.category({}));

  before(() => {
    cy.setMockData({ categories: mockCategories });

    cy.visit("/categories");
  });

  it("should load the categories page with a header", () => {
    cy.findAllByText("Categories").should("exist");
  });

  // Flaky test, because it depends on prod data:
  it(`should have all mock categories listed: ${mockCategories.map((c) => c.name).join(", ")}`, async () => {
    mockCategories.forEach((cat) => {
      expect(cat.name).to.not.be.empty;
      cy.findByText("Categories").parent().findByText(cat.name!).should("exist");
    });
  });
});

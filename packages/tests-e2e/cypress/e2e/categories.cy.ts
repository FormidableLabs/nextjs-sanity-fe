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
    mockCategories.forEach((cat) => {
      expect(cat.name).to.not.be.empty;
      cy.findByText("Categories").parent().findByText(cat.name!).should("exist");
    });
  });
});

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

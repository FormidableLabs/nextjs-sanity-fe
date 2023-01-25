import { mock } from "mocks/factory";
import { Category } from "utils/groqTypes/ProductList";
import { mockOnly } from "../utils/real-or-mock";

describe(`when I visit the "Categories" page`, () => {
  const mockCategories = mock.categories(6);
  mockOnly.before(() => {
    cy.setMockData({ categories: mockCategories });
  });

  before(() => {
    cy.visit("/categories");
  });

  it(`I see the "Categories" header`, () => {
    cy.get("main").within(() => {
      cy.get("h1.text-h1").should("exist");
      cy.get("h1.text-h1").contains("Categories");
    });
  });

  it("I see at least 3 Categories on the page", () => {
    cy.getServerSideProps("/categories").then((data) => {
      cy.get("main").within(() => {
        const categories = data.categories;
        expect(categories).to.have.length.at.least(3);
        categories.forEach((cat: Category) => {
          expect(cat.name).to.not.be.empty;
          cy.findAllByText(cat.name!).should("exist");
        });
      });
    });
  });

  if (mockOnly.isActive) {
    for (const cat of mockCategories) {
      it(`I should see the mock category "${cat.name}"`, () => {
        cy.get("main").within(() => {
          expect(cat.name).to.not.be.empty;
          cy.findAllByText(cat.name!).should("exist");
        });
      });
    }
  }
});

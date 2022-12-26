import { mockOnly } from "../utils/real-or-mock";
import { skipWhen } from "../utils/skipReason";

const notMocks = skipWhen(mockOnly.isActive, "the mock server has performance problems for the product details page");

notMocks.describe("when I visit the products page", () => {
  before(() => {
    cy.visit("/products");
  });

  it("I see the Products title", () => {
    cy.get("main").within(() => {
      cy.findByText("Products").should("exist");
    });
  });
  it("I see a sidebar with filters and sorts", () => {
    cy.findByText("Sort by");
    cy.findByText("Filters");
    cy.findByText("Flavour");
    cy.findByText("Style");
    cy.findByText("Promotion");
  });
});
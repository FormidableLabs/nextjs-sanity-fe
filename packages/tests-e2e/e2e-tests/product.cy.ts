import { mock } from "mocks/factory";
import { realOnly, mockOnly } from "../utils/real-or-mock";

describe("when I visit the Product Details Page", () => {
  realOnly.before(() => {
    // Find a product to test:
    cy.visit("/products");
    cy.visit("/products/sourdough-loaf?variant=seeded-sourdough-loaf");
  });

  mockOnly.before(() => {
    const mockProduct = mock.product({});
    cy.setMockData({ products: [mockProduct] });
    cy.visit(`/products/${mockProduct.slug}`);
  });

  it(`I see the product's title`, () => {
    cy.findAllByText("Sourdough Loaf").should("exist");
  });

  it("I see the item's price", () => {
    cy.findAllByText(/\$/i)
      .should("exist")
      .then((price) => {
        const renderedPrice = price.first().text();
        expect(renderedPrice).to.equal(`$7.98`);
      });
  });

  ["Type", "Style", "Quantity"].forEach((option) => {
    it(`I can see the "${option}" option`, async () => {
      cy.findByText(option).scrollIntoView().should("be.visible");
    });
  });
});

import { mock } from "mocks/factory";

describe("when I visit the Product Details Page", () => {
  const mockProduct = mock.product({});
  before(() => {
    cy.setMockData({ products: [mockProduct] });
    cy.visit(`/products/${mockProduct.slug!.current}`);
  });

  it(`I see the product's title`, () => {
    cy.getServerSideProps("/products/[slug]").then((data) => {
      const product = data.allProduct[0];
      cy.findAllByText(product.name!).should("exist");
    });
  });
  it("I see the item's price", () => {
    cy.getServerSideProps("/products/[slug]").then((data) => {
      const product = data.allProduct[0];
      const variant = product.variants![0]!;
      cy.findAllByText(/\$\d+\.\d\d/)
        .should("exist")
        .then((price) => {
          const renderedPrice = price.first().text();
          const expectedPrice = variant.price!;
          expect(renderedPrice).to.equal(`$${expectedPrice.toFixed(2)}`);
        });
    });
  });

  ["Type", "Style", "Quantity"].forEach((option) => {
    it(`I can see the "${option}" option`, async () => {
      cy.findByText(option).scrollIntoView().should("be.visible");
    });
  });
});

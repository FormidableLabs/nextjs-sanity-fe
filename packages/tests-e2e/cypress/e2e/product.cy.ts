describe("when I visit the Product Details Page", () => {
  const product = {
    slug: "sourdough-loaf", // TODO: mock this
    title: "Sourdough Loaf",
    price: "$7.99",
  };
  before(() => {
    cy.visit(`/products/${product.slug}`);
  });

  it(`I see the "${product.title}" title`, () => {
    cy.findAllByText(product.title).should("exist");
  });
  it("I see the item's price", () => {
    cy.findByText(product.price).should("exist");
  });
});

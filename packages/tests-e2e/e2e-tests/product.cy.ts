describe("product page", () => {
  const product = {
    slug: "sourdough-loaf", // TODO: mock this
    title: "Sourdough Loaf",
    price: "$7.99",
  };
  before(() => {
    cy.visit(`/products/${product.slug}`);
  });

  it("should load the product details page", () => {
    cy.findAllByText(product.title).should("exist");
  });
  it("should have a price", () => {
    cy.findByText(product.price).should("exist");
  });
});

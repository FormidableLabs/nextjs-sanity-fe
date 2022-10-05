describe("interceptSSR", () => {
  it("should be called before visiting a page", async () => {
    const mockJoke = "What do you give a sick lemon? Lemonaid.";

    cy.interceptSSR("https://icanhazdadjoke.com/", { joke: mockJoke });

    cy.visit("/test-interceptSSR");
  });
});

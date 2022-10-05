describe("interceptSSR", () => {
  it("should be called before visiting a page", async () => {
    const mockJoke = "What do you give a sick lemon? Lemonaid.";

    cy.interceptSSR("https://icanhazdadjoke.com/", { joke: mockJoke }).then((interceptResult) => {
      // @ts-expect-error log takes an object, so calm down mkay?
      cy.log(interceptResult);
    });

    cy.visit("/test-interceptSSR");
  });
});

describe("interceptSSR", () => {
  it("should be called before visiting a page", async () => {
    cy.interceptSSR("/some/url", { some: "data" }).then((interceptResult) => {
      // @ts-expect-error log takes an object, so calm down mkay?
      cy.log(interceptResult);
    });
  });
});

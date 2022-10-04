describe('home', () => {
  before(() => {
    cy.visit('/')
  });
  it('should load the home page with a tag line', () => {
    cy.findByText("Formidable breads for your daily life.").should('not.be.empty');
  })
})

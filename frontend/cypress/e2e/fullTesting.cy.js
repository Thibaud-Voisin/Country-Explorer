describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://country-explorer-lovat.vercel.app')
    cy.get('.selectCountry').click();
  })
})

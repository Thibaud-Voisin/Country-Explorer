describe('template spec', () => {
  it('passes', () => {
    cy.viewport(1920, 1000)
    cy.visit('https://country-explorer-lovat.vercel.app')
    cy.wait(500)
    cy.get('.selectCountry').click()
    cy.get('.selectCountry').type('Canada')
    cy.wait(500)
    cy.get('.css-yfikni-menu').click()
    cy.contains('Search').click()
    cy.wait(500)
    cy.contains('EXPAND').click()
    cy.wait(100)
    cy.contains('CLOSE').click()
    cy.get('.home_btn').click()
    cy.wait(200)
    cy.get('.swap-on').click()
    cy.wait(500)
    cy.get('.swap-off').click()
    cy.get('.selectCountry').click()
    cy.get('.selectCountry').type('Ireland')
    cy.wait(500)
    cy.get('.css-yfikni-menu').click()
    cy.contains('Search').click()
  })
})

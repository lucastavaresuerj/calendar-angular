describe('Make login', () => {
  beforeEach(() => {
    cy.makeLogin('Jack{enter}', '123456{enter}');
  });

  it('Should login', () => {
    // cy.visit('/login');
    // cy.get('#name').click().type('Jack{enter}');
    // cy.get('#password').click().type('123456{enter}');
    // cy.get('form button').click();

    cy.location('pathname').should('eq', '/');
    cy.get('nav div.dropdown button').should('contain', 'Jack');
  });
});

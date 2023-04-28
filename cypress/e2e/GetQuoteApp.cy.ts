describe('Get Quote App', () => {
  it('visita a página inicial e pesquisa por uma citação', () => {
    cy.visit('/');

    cy.intercept('https://api.quotable.io/random?tags=technology', { fixture: 'quote.json' });

    cy.get('[data-cy=noQuotesMessage]').should('contain.text', 'No quotes to show');

    cy.get('[data-cy=quoteTagInput]').type('technology');
    cy.get('[data-cy=searchQuoteButton]').click();

    cy.get('[data-cy=noQuotesMessage]').should('not.exist');
    cy.get('[data-cy=quotesList]')
      .find('li')
      .should('have.length', 1)
      .eq(0)
      .should('contain.text', 'Conteúdo 1')
      .and('contain.text', 'Autor 1');
  });
});

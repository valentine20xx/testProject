// Requires the backend (and MongoDB) to be running on :8080.
describe('todos', () => {
  it('create, edit and delete a todo', () => {
    const title = `e2e ${Date.now()}`;

    cy.visit('/');
    cy.contains('a', 'New todo').click();
    cy.get('input[name=title]').clear().type(title);
    cy.contains('button', 'Save').click();

    cy.contains('.todo', title).should('be.visible').contains('a', 'Edit').click();
    cy.get('input[name=title]').clear().type(`${title} edited`);
    cy.contains('button', 'Save').click();

    cy.contains('.todo', `${title} edited`).should('be.visible').contains('button', 'Delete').click();
    cy.contains('.todo', `${title} edited`).should('not.exist');
  });
});

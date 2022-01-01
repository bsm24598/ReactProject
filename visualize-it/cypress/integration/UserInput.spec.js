import {
    arrToSort,
    arrToSort2,
    arrToSort3,}
    from "../helpers/SortTestHelpers";


describe('User Input', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
    })
    it('test user input', () => {
        cy.get('input[id="input-numbers-to-sort"]').clear().type(arrToSort.join());
        cy.getReact('ChartArea', {state: {arr: arrToSort}}).should('have.length', 9);
    })

    it('test user input 2', () => {
        cy.get('input[id="input-numbers-to-sort"]').clear().type(arrToSort2.join());
        cy.getReact('ChartArea', {state: {arr: arrToSort}}).should('have.length', 9);
    })

    it('test user input 3', () => {
        cy.get('input[id="input-numbers-to-sort"]').clear().type(arrToSort3.join());
        cy.getReact('ChartArea', {state: {arr: arrToSort}}).should('have.length', 9);
    })
})
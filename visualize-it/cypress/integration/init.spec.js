describe('initial page setup', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
    })
    it('test initial page setup', () => {
        cy.getReact('ChartArea', {props: {sortType : 'selectionSort'}}).getProps('show').should('eq', true);
        cy.getReact('ChartArea', {props: {sortType : 'bubbleSort'}}).getProps('show').should('eq', true);
        cy.getReact('ChartArea', {props: {sortType : 'insertionSort'}}).getProps('show').should('eq', true);
        cy.getReact('ChartArea', {props: {sortType : 'mergeSort'}}).getProps('show').should('eq', true);
        cy.getReact('ChartArea', {props: {sortType : 'quickSort'}}).getProps('show').should('eq', true);
        cy.getReact('ChartArea', {props: {sortType : 'heapSort'}}).getProps('show').should('eq', true);
        cy.getReact('ChartArea', {props: {sortType : 'bucketSort'}}).getProps('show').should('eq', true);
        cy.getReact('ChartArea', {props: {sortType : 'shellSort'}}).getProps('show').should('eq', true);
        cy.getReact('ChartArea', {props: {sortType : 'radixSort'}}).getProps('show').should('eq', true);
    })
})
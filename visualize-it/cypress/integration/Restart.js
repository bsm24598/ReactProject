import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    clickAllSortsExceptN,
    comparisons,
    comparisons2,
    comparisons3
} from "../helpers/SortTestHelpers";

function testRestart(arrToSort, comparisons)
{
    cy.get('input[id="input-numbers-to-sort"]').clear().type(arrToSort.join());
    clickAllSortsExceptN(0);
    cy.get('textarea[class="algorithm-log"]').should("have.text", "UNSORTED");
    cy.get('button').contains(new RegExp("^Play$")).click({force: true});
    cy.wait(6000);
    cy.get('textarea[class="algorithm-log"]').should("have.text",
        comparisons[5][0] + ": " + comparisons[5][1] + " with " + comparisons[5][2]);
    cy.get('button').contains(new RegExp("^Restart$")).click({force: true});
    cy.get('textarea[class="algorithm-log"]').should("have.text", "UNSORTED");
    cy.wait(3000);
    cy.get('textarea[class="algorithm-log"]').should("have.text",
        comparisons[2][0] + ": " + comparisons[2][1] + " with " + comparisons[2][2]);
}
describe('Testing Restart', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
    })
    it('test restart', () => {
        testRestart(arrToSort, comparisons);
    })

    it('test restart 2', () => {
        testRestart(arrToSort2, comparisons2);
    })

    it('test restart 3', () => {
        testRestart(arrToSort3, comparisons3);
    })
})
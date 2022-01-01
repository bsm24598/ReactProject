import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    clickAllSortsExceptN,
    comparisons,
    comparisons2,
    comparisons3
} from "../helpers/SortTestHelpers";


function testPlayPauseReverse(arrToSort, comparisons)
{
    cy.get('input[id="input-numbers-to-sort"]').clear().type(arrToSort.join());
    clickAllSortsExceptN(0);
    cy.get('textarea[class="algorithm-log"]').should("have.text", "UNSORTED");
    cy.get('button').contains(new RegExp("^Play$")).click({force: true});
    cy.wait(3000);
    cy.get('button').contains(new RegExp("^Pause$")).click({force: true});
    cy.get('textarea[class="algorithm-log"]').should("have.text",
        comparisons[2][0] + ": " + comparisons[2][1] + " with " + comparisons[2][2]);
    cy.wait(3000);
    cy.get('textarea[class="algorithm-log"]').should("have.text",
        comparisons[2][0] + ": " + comparisons[2][1] + " with " + comparisons[2][2]);
    cy.get('button').contains(new RegExp("^Play$")).click({force: true});
    cy.wait(3000);
    cy.get('textarea[class="algorithm-log"]').should("have.text",
        comparisons[5][0] + ": " + comparisons[5][1] + " with " + comparisons[5][2]);
    cy.get('button').contains(new RegExp("^Reverse$")).click({force: true});
    cy.wait(3000);
    cy.get('textarea[class="algorithm-log"]').should("have.text",
        comparisons[2][0] + ": " + comparisons[2][1] + " with " + comparisons[2][2]);
    cy.wait(3000);
    cy.get('textarea[class="algorithm-log"]').should("have.text", "UNSORTED");
}
describe('Play/Pause/Reverse', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
    })
    it('test pause/play/reverse', () => {
        testPlayPauseReverse(arrToSort, comparisons)
    })

    it('test pause/play/reverse 2', () => {
        testPlayPauseReverse(arrToSort2, comparisons2)
    })

    it('test pause/play/reverse 3', () => {
        testPlayPauseReverse(arrToSort3, comparisons3)
    })
})

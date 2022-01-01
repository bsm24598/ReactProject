//using selection sort, make sure the text is as expected for the algorithm
import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    clickAllSortsExceptN,
    comparisons,
    comparisons2,
    comparisons3
} from "../helpers/SortTestHelpers";

function testLog(arrToSort, comparisons)
{
    cy.get('input[id="input-numbers-to-sort"]').clear().type(arrToSort.join());
    clickAllSortsExceptN(0);
    cy.get('textarea[class="algorithm-log"]').should("have.text", "UNSORTED");
    cy.get('button').contains(new RegExp("^Play$")).click({force: true});
    for (let i = 0; i < comparisons.length; i++)
    {
        cy.get('textarea[class="algorithm-log"]').should("have.text",
            comparisons[i][0] + ": " + comparisons[i][1] + " with " + comparisons[i][2]);
    }
    cy.get('textarea[class="algorithm-log"]').should("have.text", "SORTED");
}


describe('Text Log', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
    })
    it('test text log', () => {
        testLog(arrToSort, comparisons);
    })

    //using selection sort, make sure the text is as expected for the algorithm
    it('test text log 2', () => {
        testLog(arrToSort2, comparisons2);
    })

    //using selection sort, make sure the text is as expected for the algorithm
    it('test text log 3', () => {
        testLog(arrToSort3, comparisons3);
    })
})
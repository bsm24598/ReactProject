import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    barOffset,
    comparisons,
    comparisons2,
    comparisons3,
    clickAllSortsExceptN }
    from "../helpers/SortTestHelpers";

let barOffsets = [142.3, 332.0, 142.3, -47.4, 94.8, -47.4, -237.1, -332.0,-47.4]

describe('Speed Select', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
        cy.get('input[id="input-numbers-to-sort"]').clear().type(arrToSort.join());
    })

    it('test speed select', () => {
        clickAllSortsExceptN(0);
        cy.get('div[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"]').dblclick({force: true});
        cy.get('li[data-value="100"]').click({force: true});


        cy.get('button').contains(new RegExp("^Play$")).click({force: true});
        cy.get('textarea[class="algorithm-log"]', {timeout: 9000}).should("have.text", "SORTED");

        for (let i = 1; i < arrToSort.length; i++) {
            cy.react('Bar', {props: {barHeight: arrToSort[i]}})
                .should('have.attr', 'style')
                .should('contain', 'transform: translateX(' + barOffsets[i])
        }
        cy.get('div[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"]').dblclick({force: true});
        cy.get('li[data-value="1000"]').click({force: true});
        cy.get('button').contains(new RegExp("^Play$")).click({force: true});
        cy.get('textarea[class="algorithm-log"]', {timeout: 90000}).should("have.text", "SORTED");
        for (let i = 0; i < arrToSort.length; i++) {
            cy.react('Bar', {props: {barHeight: arrToSort[i]}})
                .should('have.attr', 'style')
                .should('contain', 'transform: translateX(' + barOffsets[i])
        }
    })
})
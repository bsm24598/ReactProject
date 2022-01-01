import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    barOffset,
    barOffset2,
    testSort }
    from "../helpers/SortTestHelpers";


describe('Selection Sort', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
        cy.get('div[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"]').dblclick({force: true});
        cy.get('li[data-value="100"]').click({force: true});
    })
    it('test selectionSort', () => {
        testSort(arrToSort, barOffset, 0);
    })

    it('test selectionSort 2', () => {
        testSort(arrToSort2, barOffset2, 0);
    })

    it('test selectionSort 3', () => {
        testSort(arrToSort3, "none", 0);
    })
})
import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    barOffset,
    barOffset2,
    barOffset3,
    testSort }
    from "../helpers/SortTestHelpers";


describe('Quick Sort', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
        cy.get('div[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"]').dblclick({force: true});
        cy.get('li[data-value="100"]').click({force: true});
    })
    it('test quickSort', () => {
        testSort(arrToSort, barOffset, 4);
    })

    it('test quickSort 2', () => {
        testSort(arrToSort2, barOffset2, 4);
    })

    it('test quickSort 3', () => {
        testSort(arrToSort3, barOffset3, 4);
    })
})
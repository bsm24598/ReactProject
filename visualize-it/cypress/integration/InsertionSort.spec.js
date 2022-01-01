import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    barOffset,
    barOffset2,
    testSort }
    from "../helpers/SortTestHelpers";


describe('Insertion Sort', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
        cy.get('div[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"]').dblclick({force: true});
        cy.get('li[data-value="100"]').click({force: true});
    })
    it('test insertionSort', () => {
        testSort(arrToSort, barOffset, 2);
    })

    it('test insertionSort 2', () => {
        testSort(arrToSort2, barOffset2, 2);
    })

    it('test insertionSort 3', () => {
        testSort(arrToSort3, "none", 2);
    })
})
import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    barOffset,
    barOffset2,
    testSort }
    from "../helpers/SortTestHelpers";




describe('Bubble Sort', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
        cy.get('div[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"]').dblclick({force: true});
        cy.get('li[data-value="100"]').click({force: true});
    })

    it('test bubbleSort', () => {
        testSort(arrToSort, barOffset, 1);
    })

    it('test bubbleSort 2', () => {
        testSort(arrToSort2, barOffset2, 1);
    })

    it('test bubbleSort 3', () => {
        testSort(arrToSort3, "none", 1);
    })
})
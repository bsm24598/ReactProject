import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    barOffset,
    barOffset2,
    testSort }
    from "../helpers/SortTestHelpers";


describe('Shell Sort', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
        cy.get('div[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"]').dblclick({force: true});
        cy.get('li[data-value="100"]').click({force: true});
    })
    it('test shellSort', () => {
        testSort(arrToSort, barOffset, 7);
    })

    it('test shellSort 2', () => {
        testSort(arrToSort2, barOffset2, 7);
    })

    it('test shellSort 3', () => {
        testSort(arrToSort3, "none", 7);
    })
})
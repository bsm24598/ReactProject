import {
    arrToSort,
    arrToSort2,
    arrToSort3,
    barOffset,
    barOffset2,
    barOffset3,
    testSort }
    from "../helpers/SortTestHelpers";


describe('Heap Sort', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
        cy.get('div[class="MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input"]').dblclick({force: true});
        cy.get('li[data-value="100"]').click({force: true});
    })
    it('test heapSort', () => {
        testSort(arrToSort, barOffset, 5);
    })

    it('test heapSort 2', () => {
        testSort(arrToSort2, barOffset2, 5);
    })

    it('test heapSort 3', () => {
        testSort(arrToSort3, ["-0", "0", "0", "0", "0", "0", "0", "0", "0"], 5);
    })
})
import {
    arrToInput0,
    arrToInput1,
    arrToInput2,
    arrToInput3,
    arrToInput4,
    arrToInput5,
    nodeOffsets0,
    nodeOffsets1,
    nodeOffsets2,
    nodeOffsets3,
    nodeOffsets4,
    nodeOffsets5,
    addTreeNodes,
    checkNodesVisibleAndCorrect,
    checkNodesPosition
}
    from "../helpers/TreeTestHelpers";

describe('Add nodes to tree', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Trees')
        cy.waitForReact();
    })

    it("test adding", () =>
    {
        addTreeNodes(arrToInput0);
        checkNodesVisibleAndCorrect(arrToInput0);
        checkNodesPosition(arrToInput0, nodeOffsets0);
    })

    it("test adding 2", () =>
    {
        addTreeNodes(arrToInput1);
        checkNodesVisibleAndCorrect(arrToInput1);
        checkNodesPosition(arrToInput1, nodeOffsets1);
    })

    it("test adding 3", () =>
    {
        addTreeNodes(arrToInput2);
        checkNodesVisibleAndCorrect(arrToInput2);
        checkNodesPosition(arrToInput2, nodeOffsets2);
    })

    it("test adding 4", () =>
    {
        addTreeNodes(arrToInput3);
        checkNodesVisibleAndCorrect(arrToInput3);
        checkNodesPosition(arrToInput3, nodeOffsets3);
    })

    it("test adding 5", () =>
    {
        addTreeNodes(arrToInput4);
        checkNodesVisibleAndCorrect(arrToInput4);
        checkNodesPosition(arrToInput4, nodeOffsets4);
    })

    it("test adding 6", () =>
    {
        addTreeNodes(arrToInput5);
        checkNodesVisibleAndCorrect(arrToInput5);
        checkNodesPosition(arrToInput5, nodeOffsets5);
    })

    it("test adding using enter", () => {
        arrToInput3.forEach(i=>{
            cy.get('input[id="add-text-field"]').type(i).type('{enter}');
        })
        checkNodesVisibleAndCorrect(arrToInput3);
        checkNodesPosition(arrToInput3, nodeOffsets3);
    })
})
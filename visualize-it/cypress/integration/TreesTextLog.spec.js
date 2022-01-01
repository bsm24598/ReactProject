import {
    arrToInput1,
    arrToInput3,
    arrToInput4,
    addTreeNodesCheckLog,
    addTreeNodes, deleteTreeNode
}
    from "../helpers/TreeTestHelpers";

describe('Test tree text log', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Trees')
        cy.waitForReact();
    })

    it('test log while adding 1', () => {
        addTreeNodesCheckLog(arrToInput1,
            ["0 added as root node", "1 >= 0.  1 is placed to the right of 0",
                "2 >= 1.  2 is placed to the right of 1"]);
    })

    it('test log while adding 2', () => {
        addTreeNodesCheckLog(arrToInput3,
            ["2 added as root node", "1 < 2.  1 is placed to the left of 2",
                "0 < 1.  0 is placed to the left of 1"]);
    })

    it('test log for preorder 1', () => {
        addTreeNodes(arrToInput1);
        cy.get('button[id="preorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 0 -> 1 -> 2");
    })

    it('test log for preorder 2', () => {
        addTreeNodes(arrToInput3);
        cy.get('button[id="preorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 2 -> 1 -> 0");
    })

    it('test log for preorder 3', () => {
        addTreeNodes(arrToInput4);
        cy.get('button[id="preorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 0 -> 1 -> 0 -> 2 -> 1 -> 2 -> 9 -> 8 -> 10");
    })

    it('test log for inorder 1', () => {
        addTreeNodes(arrToInput1);
        cy.get('button[id="inorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 0 -> 1 -> 2");
    })

    it('test log for inorder 2', () => {
        addTreeNodes(arrToInput3);
        cy.get('button[id="inorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 0 -> 1 -> 2");
    })

    it('test log for inorder 3', () => {
        addTreeNodes(arrToInput4);
        cy.get('button[id="inorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 0 -> 0 -> 1 -> 1 -> 2 -> 2 -> 8 -> 9 -> 10");
    })

    it('test log for postorder 1', () => {
        addTreeNodes(arrToInput1);
        cy.get('button[id="postorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 2 -> 1 -> 0");
    })

    it('test log for postorder 2', () => {
        addTreeNodes(arrToInput3);
        cy.get('button[id="postorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 0 -> 1 -> 2");
    })

    it('test log for postorder 3', () => {
        addTreeNodes(arrToInput4);
        cy.get('button[id="postorder-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', " -> 0 -> 1 -> 8 -> 10 -> 9 -> 2 -> 2 -> 1 -> 0");
    })

    it('test log for delete 1', () => {
        addTreeNodes(arrToInput1);
        deleteTreeNode(arrToInput1[0]);
        cy.get('p[id="tree-text-log"]').should('have.text', arrToInput1[0] + " was deleted!");
    })

    it('test log for delete 2', () => {
        addTreeNodes(arrToInput1);
        deleteTreeNode(arrToInput1[1]);
        cy.get('p[id="tree-text-log"]').should('have.text', arrToInput1[1] + " was deleted!");
    })

    it('test log for delete 3', () => {
        addTreeNodes(arrToInput1);
        deleteTreeNode(arrToInput1[2]);
        cy.get('p[id="tree-text-log"]').should('have.text', arrToInput1[2] + " was deleted!");
    })

    it('test log for search 1', () => {
        addTreeNodes(arrToInput1);
        cy.get('input[id="search-text-field"]').type(arrToInput1[0].toString()).wait(500);
        cy.get('button[id="search-tree-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', arrToInput1[0] + " was found!");
    })

    it('test log for search 2', () => {
        addTreeNodes(arrToInput1);
        cy.get('input[id="search-text-field"]').type(arrToInput1[1].toString()).wait(500);
        cy.get('button[id="search-tree-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', arrToInput1[1] + " was found!");
    })

    it('test log for search 3', () => {
        addTreeNodes(arrToInput1);
        cy.get('input[id="search-text-field"]').type(arrToInput1[2].toString()).wait(500);
        cy.get('button[id="search-tree-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', arrToInput1[2] + " was found!");
    })
    it('No number input!',()=>{
        cy.get('button[id="add-to-tree-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', 'No number input!');
        cy.get('button[id="delete-from-tree-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', 'No number input!');
        cy.get('button[id="search-tree-bt"]').click();
        cy.get('p[id="tree-text-log"]').should('have.text', 'No number input!');
    })
})
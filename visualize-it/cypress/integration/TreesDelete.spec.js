import {
    arrToInput0,
    arrToInput1,
    arrToInput4,
    arrToInput5,
    arrToInput6,
    arrToInput7,
    nodeOffsetsDelete5,
    nodeOffsetsDelete6,
    nodeOffsetsDelete7,
    addTreeNodes,
    deleteTreeNodes,
    deleteTreeNodesWPos,
    checkNodesVisibleAndCorrect
}
    from "../helpers/TreeTestHelpers";


describe('Delete From Tree', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Trees')
        cy.waitForReact();
    })

    it('delete from empty tree, text log should say the tree has no nodes', () => {
        deleteTreeNodes(arrToInput0)
        cy.get('p[id="tree-text-log"').should('have.text','This tree is empty')
    })

    it('delete from tree where value is not in tree, should search tree, then give prompt that node is not in tree', () => {
        addTreeNodes(arrToInput1);
        checkNodesVisibleAndCorrect(arrToInput1);
        deleteTreeNodes([arrToInput1[0]+10]); //whatever the value is, it is not in the tree
        checkNodesVisibleAndCorrect(arrToInput1); //make sure all nodes are still visible
        cy.get('p[id="tree-text-log"').should('have.text',arrToInput1[0]+10+ " does not exist in the tree!");
    })

    it('delete from empty tree where value did exist, should give prompt that tree has no nodes',()=>{
        addTreeNodes(arrToInput1);
        checkNodesVisibleAndCorrect(arrToInput1);
        deleteTreeNodes(arrToInput1);
        deleteTreeNodes(arrToInput1);
        cy.get('p[id="tree-text-log"').should('have.text','This tree is empty')
    })

    it('delete all nodes from big tree',()=>{
        addTreeNodes(arrToInput4);
        checkNodesVisibleAndCorrect(arrToInput4);
        deleteTreeNodes(arrToInput4);
        for (let i = 0; i < arrToInput4.length; i++)
        {
            cy.get('.node'+i).should('not.be.visible');
        }
    })

    it('delete a node with 2 children',()=>{
        addTreeNodes(arrToInput5);
        deleteTreeNodesWPos(arrToInput5, nodeOffsetsDelete5);
        for (let i = 0; i < arrToInput5.length; i++)
        {
            cy.get('.node'+i).should('not.be.visible');
        }
    })
    it('delete a node with left child only',()=>{
        addTreeNodes(arrToInput6);
        deleteTreeNodesWPos(arrToInput6, nodeOffsetsDelete6);
        for (let i = 0; i < arrToInput6.length; i++)
        {
            cy.get('.node'+i).should('not.be.visible');
        }
    })
    it('delete a node with right child only',()=>{
        addTreeNodes(arrToInput7);
        deleteTreeNodesWPos(arrToInput7, nodeOffsetsDelete7);
        for (let i = 0; i < arrToInput7.length; i++)
        {
            cy.get('.node'+i).should('not.be.visible');
        }
    })
    it('delete a single node',()=>{
        addTreeNodes(arrToInput0);
        deleteTreeNodesWPos(arrToInput0, []);
    });

    it('delete only one node from a big tree', ()=> {
        addTreeNodes(arrToInput4);
        checkNodesVisibleAndCorrect(arrToInput4);
        deleteTreeNodes([arrToInput4[1]]);
        checkNodesVisibleAndCorrect(arrToInput4, [4]);
    })
})
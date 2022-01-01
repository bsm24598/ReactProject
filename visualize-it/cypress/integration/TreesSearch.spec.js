import {
    arrToInput0,
    arrToInput4,
    arrToInput5,
    nodesSearchPos0,
    nodesSearchColors0,
    nodesSearchPos4,
    nodesSearchColors4,
    nodesSearchPos5,
    nodesSearchColors5,
    addTreeNodes,
    searchTreeNodes, deleteTreeNodes
}
    from "../helpers/TreeTestHelpers";


describe('Search Tree', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Trees')
        cy.waitForReact();
    })
    it('search empty tree, text log should say the tree is empty', () => {
        cy.get('input[id="search-text-field"]').type(arrToInput0[0]).wait(500);
        cy.get('button[id="search-tree-bt"]').click()
        cy.get('p[id="tree-text-log"').should('have.text','This tree is empty')
    })
    it('search tree where value is not in tree, should search tree, then give prompt that node is not in tree', () => {
        addTreeNodes(arrToInput0);
        cy.get('div[id="0"]').should('be.visible')

        //whatever the value is, it is not in the tree. should search only value.
        searchTreeNodes([arrToInput0[0]+1], nodesSearchPos0, [[nodesSearchColors0[1]]]);

        cy.get('div[id="0"]').should('be.visible') //make sure the first is still visible
        cy.get('p[id="tree-text-log"]').should('have.text',(arrToInput0[0]+1)+ " does not exist in the tree!");
    })
    it('search empty tree where value did exist, should give prompt that tree has no nodes',()=>{
        addTreeNodes(arrToInput0);
        cy.get('div[id="0"]').should('be.visible')
        deleteTreeNodes(arrToInput0);
        cy.get('input[id="search-text-field"]').type(1).wait(500);
        cy.get('button[id="search-tree-bt"]').click()
        assert.equal(false, searchTreeNodes(arrToInput0,[],[]));
        cy.get('div[id="0"]').should('not.be.visible')
        cy.get('p[id="tree-text-log"').should('have.text','This tree is empty')
    })

    //checks positions and color changes
    it('search all nodes in big tree',()=>{
        //tree has duplicates, a parent node with 1 child node, and a parent node with 2 child nodes
        addTreeNodes(arrToInput4);
        searchTreeNodes(arrToInput4,nodesSearchPos4, nodesSearchColors4);
    })
    it('search node with two children',()=>{
        addTreeNodes(arrToInput5);
        searchTreeNodes(arrToInput5, nodesSearchPos5, nodesSearchColors5);
    })
})
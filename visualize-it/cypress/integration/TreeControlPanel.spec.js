import {addTreeNodes} from "../helpers/TreeTestHelpers.js";
describe('Control Panel Tests', () => {
    beforeEach(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Trees')
        cy.waitForReact();
    })
    //this should test clear() function and example function
    it('add value, then generate example tree', () => {
        addTreeNodes([1]);
        cy.get('[id="example-tree-bt"]').click();
        cy.get('div[id="0"]').should('be.visible');
        cy.get('[id="example-tree-bt"]').click();
        cy.get('div[id="0"]').should('be.visible');
    })

    it('add value, then clear tree', () => {
        addTreeNodes([1]);
        cy.get('[id="clear-tree-bt"]').click();
        cy.get('div[id="0"]').should('not.be.visible');
    })

    it('horizontal test',()=>{
        cy.viewport(1487,970)
        cy.get('[id="add-to-tree-bt"]').should('be.visible');
        cy.get('[id="delete-from-tree-bt"]').should('be.visible');
        cy.get('[id="search-tree-bt"]').should('be.visible');
        cy.get('[id="example-tree-bt"]').should('be.visible');
        cy.get('[id="clear-tree-bt"]').should('be.visible');
        cy.get('[id="preorder-bt"]').should('be.visible');
        cy.get('[id="inorder-bt"]').should('be.visible');
        cy.get('[id="postorder-bt"]').should('be.visible');
    })
})
import {arrToSort, clickAllSortsExceptN} from "../helpers/SortTestHelpers";

describe('Testing Static Components on Home Page', () => {
    before(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/')
        cy.waitForReact();
    })
    it('test home options hover', () => {
        cy.get('#sorting-algos').trigger('mouseover')
        cy.get('#sorting-algos').should('have.css', 'background-color', 'rgb(37, 36, 35)')
        cy.get('#trees').trigger('mouseover')
        cy.get('#trees').should('have.css', 'background-color', 'rgb(37, 36, 35)')
    })
    it("go to about, test buttons, then go to trees ", () => {
        cy.visit('/tm-repo-se-team-3-visualize-it/About/')
        cy.get('#sorting-doc-button').click()
        cy.get('#binary-doc-button').click()
        cy.visit('/tm-repo-se-team-3-visualize-it/Trees/')
        cy.get('#treeArea').should('be.visible')
    })
})

describe('Input Area tests: Testing Bar Values, Removing Digits, Invalid Input, and Time Complexity', () => {
    before(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
    })

    it("test bar values", () => {
        cy.get('Button[id="barValToggle"').click({force: true});
        cy.get('input[id="input-numbers-to-sort"]').clear().type([1,2,3].join());
        cy.react('Bar', {props: {barHeight: 1}})
            .contains('p','01')
        cy.react('Bar', {props: {barHeight: 2}})
            .contains('p','02')
        cy.react('Bar', {props: {barHeight: 3}})
            .contains('p','03')
    })
    it('test adding invalid input, should filter the input' ,()=>{
        let inputArr= [1,2,3];
        let arrAfterChange;
        cy.get('input[id="input-numbers-to-sort"]').clear().type(inputArr.join());
        cy.get('input[id="input-numbers-to-sort"]').type(';;;loremipsumdolorsitamet-=+./');
        cy.get('input[id="input-numbers-to-sort"]').then(($btn)=> {
            arrAfterChange = $btn[0].placeholder;
            assert.equal(inputArr.toString(), arrAfterChange)
        })
    })
    it('test info area', () => {
        clickAllSortsExceptN(0);
        cy.get('button[id="selectionSortInfo"]').trigger('mouseover')
        cy.get('div[data-id="tooltip"]').should("be.visible");
        //hover over arbitrary button to test that hover effect is no longer visible
        cy.get('button[id="reset-all-bt"]').trigger('mouseover')
        cy.get('div[data-id="tooltip"]').should("not.be.visible");
    })
})

describe('Testing Nav Bar and Footer on Big Screens', () => {
    before(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/')
        cy.waitForReact();
    })

    it("test navigation, starting at home page", () => {
        cy.get('button[id="logo-vi"]').click();
        cy.get('button[id="nav-home-bt"]').click();
        cy.get('button[id="nav-about-bt"]').click();
        cy.get('button[id="nav-sortingalgos-bt"]').click();
        cy.get('button[id="nav-bst-bt"]').click();
        cy.get('button[id="nav-bst-bt"]').click();
        cy.get('button[id="ftr-visIT-bt"]').click();
        cy.get('button[id="ftr-home-bt"]').click();
        cy.get('button[id="ftr-about-bt"]').click();
        cy.get('button[id="ftr-sortingalgos-bt"]').click();
        cy.get('button[id="ftr-bst-bt"]').click();
        cy.get('button[id="ftr-copyright-bt"]').click();

        cy.viewport('iphone-6')
        cy.get('button[id="hamburger-button"]').click({force:true})
        cy.get('li[id="hmbrgr-home-bt"]').click()
        cy.get('button[id="hamburger-button"]').click({force:true})
        cy.get('li[id="hmbrgr-about-bt"]').click()
        cy.get('button[id="hamburger-button"]').click({force:true})
        cy.get('li[id="hmbrgr-sortingalgos-bt"]').click()
        cy.get('button[id="hamburger-button"]').click({force:true})
        cy.get('li[id="hmbrgr-bst-bt"]').click()
        cy.get('button[id="logo-vi2"]').click({force:true})
    })
})

describe('Testing Regenerate Array, Play All, Restart All, Remove All Sorts', () => {
    before(() => {
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        cy.waitForReact();
    })

    it("test refresh button on big screens", () => {
         let placeholderBeforeRefresh;
         let placeholderAfterRefresh;
         cy.get('input[id="input-numbers-to-sort"]').then(($btn)=>{
             placeholderBeforeRefresh = $btn[0].placeholder;
             cy.get('button[id="refresh-big"]').click({force: true});
             cy.get('input[id="input-numbers-to-sort"]').then(($btn)=>{
                 placeholderAfterRefresh = $btn[0].placeholder
                 assert.notEqual(placeholderBeforeRefresh,placeholderAfterRefresh)
             })
        })
    })
    it("test refresh button on small screens",()=>{
        cy.viewport('iphone-6')
        let arrayOfInputBeforeRefresh;
        let arrayOfInputAfterRefresh;
        cy.getReact('ChartArea', {props: {sortType: "selectionSort"}}).then(($arrRef1)=>{
            arrayOfInputBeforeRefresh = $arrRef1[0].state.animator.arr
        })
        cy.get('button[id="refresh-small"]').click({force: true});
        cy.getReact('ChartArea', {props: {sortType: "selectionSort"}}).then(($arrRef2)=>{
            arrayOfInputAfterRefresh = $arrRef2[0].state.animator.arr
            console.log(arrayOfInputAfterRefresh)
            assert.notEqual(arrayOfInputBeforeRefresh,arrayOfInputAfterRefresh)
        })


    })
    it("play all button", () => {
        cy.get('button[id="play-all-bt"]').click({force: true});
    })
    it("reset all button", () => {
        cy.get('button[id="reset-all-bt"]').click({force: true});
    })
    it("test empty set of sorting algorithms text",()=>{
        cy.visit('/tm-repo-se-team-3-visualize-it/Sorting-Algorithms')
        clickAllSortsExceptN(0);
        cy.get('button').contains('Selection Sort').click({force: true});
        cy.get('h3[id="no-charts-visible-hdr"]').should("have.text", "Please click on a sorting algorithm above");
    })
})
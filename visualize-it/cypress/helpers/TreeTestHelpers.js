exports.arrToInput0 = [1] //single value
exports.arrToInput1 = [0,1,2] // ascending
exports.arrToInput2 = [1,1,1] // all the same
exports.arrToInput3 = [2,1,0] // descending
exports.arrToInput4 = [0,1,2,2,1,0,9,8,10] // some repeating | large input set
exports.arrToInput5 = [1,0,2] // one on both sides
exports.arrToInput6 = [0,1] // one on right
exports.arrToInput7 = [1,0] // one on left

// [1] single value
exports.nodeOffsets0 = [{x:368.625, y:35}];
// [0,1,2] ascending
exports.nodeOffsets1 = [{x:368.625, y:35}, {x:403.625, y:80}, {x:438.625, y:125}];
// [1,1,1]  all the same
exports.nodeOffsets2 = [{x:368.625, y:35}, {x:403.625, y:80}, {x:438.625, y:125}];
// [2,1,0] descending
exports.nodeOffsets3 = [{x:368.625, y:35}, {x:333.625, y:80}, {x:298.625, y:125}];
// [0,1,2,2,1,0,9,8,10] some repeating | large input set
exports.nodeOffsets4 = [{x:368.625, y:35}, {x:438.625, y:80}, {x:508.625, y:125}, {x:543.625, y:170}, {x:473.625, y:170},
                        {x:403.625, y:125}, {x:613.625, y:215}, {x:578.625, y:260}, {x:648.625, y:260}];
// [1,0,2] one on both sides
exports.nodeOffsets5 = [{x:368.625, y:35}, {x:333.625, y:80}, {x:403.625, y:80}];
// [0,1] one on right
exports.nodeOffsets6 = [{x:368.625, y:35}, {x:403.625, y:80}]
// [1,0] one on left
exports.nodeOffsets7 = [{x:368.625, y:35}, {x:298.625, y:80}]

let rows = {
    zero: 35,
    one: 80,
    two: 125,
    three: 170,
    four: 215,
    five: 260
}
let columns= {
    neg6: 158.625,
        neg5: 193.625,
        neg4: 228.625,
        neg3: 263.625,
        neg2: 298.625,
        neg1: 333.625,
        zero: 368.625,
        one: 403.625,
        two: 438.625,
        three: 473.625,
        four: 508.625,
        five: 543.625,
        six: 578.625,
}


// [1] single value will have no valid positions, should just not be visible

// [0,1,2] ascending
exports.nodeOffsetsDelete1 = [
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")", "matrix(1, 0, 0, 1, " + columns.one +", "+rows.one+")"],
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")"]
];

// [1,1,1]  all the same
exports.nodeOffsetsDelete2 = [
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")", "matrix(1, 0, 0, 1, " + columns.one +", "+rows.one+")"],
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")"]
];
// [2,1,0] descending
exports.nodeOffsetsDelete3 =[
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")", "matrix(1, 0, 0, 1, " + columns.neg1 +", "+rows.one+")"],
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")"]
];
// [0,1,2,2,1,0,9,8,10] some repeating | large input set
exports.nodeOffsetsDelete4 = [
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")",
    "matrix(1, 0, 0, 1, "+columns.neg2+", "+ rows.one+")",
    "matrix(1, 0, 0, 1, 508.625, 125)",
    "matrix(1, 0, 0, 1, 543.625, 170)",
    "matrix(1, 0, 0, 1, 473.625, 170)",
    "matrix(1, 0, 0, 1, 403.625, 125)",
    "matrix(1, 0, 0, 1, 613.625, 215)",
    "matrix(1, 0, 0, 1, 578.625, 260)",
    "matrix(1, 0, 0, 1, 648.625, 260)",
    "matrix(1, 0, 0, 1, " + columns.one +", "+rows.one+")"
    ]
];
// [1,0,2] one on both sides
// deleting root node first
exports.nodeOffsetsDelete5 = [
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")", "matrix(1, 0, 0, 1, "+columns.neg1+", "+ rows.one+")"],
    ["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")"]
];
// [0,1] one on right
exports.nodeOffsetsDelete6 = [["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")"]] // assume root value deleted
// [1,0] one on left
exports.nodeOffsetsDelete7 = [["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")"]]; // assume root value deleted

// COLORS FOR SEARCHING:
let colors = {
    blue: 'rgb(97, 195, 255)',
    orange: 'rgb(246, 152, 44)',
    GREEN:'rgb(164, 255, 79)'
}

//single value
exports.nodesSearchPos0 =["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")"]
exports.nodesSearchColors0 = [colors.blue,colors.orange,colors.GREEN]


// [0,1,2,2,1,0,9,8,10] some repeating | large input set
exports.nodesSearchPos4 =["matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")",
    "matrix(1, 0, 0, 1, 438.625, "+ rows.one+")",
    "matrix(1, 0, 0, 1, 508.625, 125)",
    "matrix(1, 0, 0, 1, 543.625, 170)",
    "matrix(1, 0, 0, 1, 473.625, 170)",
    "matrix(1, 0, 0, 1, 403.625, 125)",
    "matrix(1, 0, 0, 1, 613.625, 215)",
    "matrix(1, 0, 0, 1, 578.625, 260)",
    "matrix(1, 0, 0, 1, 648.625, 260)",
    "matrix(1, 0, 0, 1, " + columns.one +", "+rows.one+")",
]

// [0,1,2,2,1,0,9,8,10] some repeating | large input set
exports.nodesSearchColors4 = [
    [colors.GREEN,colors.blue,colors.blue,
        colors.blue,colors.blue,colors.blue,
        colors.blue,colors.blue,colors.blue], //0
    [colors.orange,colors.GREEN,colors.blue,
        colors.blue,colors.blue,colors.blue,
        colors.blue,colors.blue,colors.blue], //1
    [colors.orange,colors.orange,colors.GREEN,
        colors.blue,colors.blue,colors.blue,
        colors.blue,colors.blue,colors.blue], //2
    [colors.orange,colors.orange,colors.GREEN,
        colors.blue,colors.blue,colors.blue,
        colors.blue,colors.blue,colors.blue], //3
    [colors.orange,colors.GREEN,colors.blue,
        colors.blue,colors.blue,colors.blue,
        colors.blue,colors.blue,colors.blue], //4
    [colors.GREEN,colors.blue,colors.blue,
        colors.blue,colors.blue,colors.blue,
        colors.blue,colors.blue,colors.blue], //5
    [colors.orange,colors.orange,colors.orange,
        colors.orange,colors.blue,colors.blue,
        colors.GREEN,colors.blue,colors.blue], //6
    [colors.orange,colors.orange,colors.orange,
        colors.orange,colors.blue,colors.blue,
        colors.orange,colors.GREEN,colors.blue], //7
    [colors.orange,colors.orange,colors.orange,
        colors.orange,colors.blue,colors.blue,
        colors.orange,colors.blue,colors.GREEN]] //8

// [1,0,2] one on both sides
exports.nodesSearchPos5 =[
    "matrix(1, 0, 0, 1, " + columns.zero +", "+rows.zero+")",
    "matrix(1, 0, 0, 1, " + columns.neg1 +", "+rows.one+")",
    "matrix(1, 0, 0, 1, " + columns.one +", "+rows.one+")"
]
// [1,0,2] one on both sides
exports.nodesSearchColors5 = [
    [colors.GREEN,colors.blue,colors.blue],
    [colors.orange,colors.GREEN,colors.blue],
    [colors.orange,colors.blue,colors.GREEN]
]


//adds all of array to tree
export function addTreeNodes(arrToAdd) {
    arrToAdd.forEach(i=>{
        cy.get('input[id="add-text-field"]').type(i);
        cy.get('button[id="add-to-tree-bt"]').click();
    })
}

//add a single node and check the text log to make sure it's displaying the given text(s)
export function addNodeCheckLog(nodeToAdd, logText) {
    cy.get('input[id="add-text-field"]').type(nodeToAdd);
    cy.get('button[id="add-to-tree-bt"]').click();
    cy.get('p[id="tree-text-log"]').should('have.text', logText);
}

//add all of an array to a tree and check the log at each step
export function addTreeNodesCheckLog(arrToAdd, arrLogText) {
    for (let i = 0; i < arrToAdd.length; i++)
    {
        addNodeCheckLog(arrToAdd[i], arrLogText[i]);
    }
}

//deletes all nodes in a tree
export function deleteTreeNodes(arrToDel){
    arrToDel.forEach(i=>{
        deleteTreeNode(i);
    })
}

export function deleteTreeNode(nodeToDel){
    cy.get('input[id="delete-text-field"]').type(nodeToDel);
    cy.get('button[id="delete-from-tree-bt"]').click().wait(1000);
}


/**
 *
 * @param arrToDel: all values to be deleted from tree
 * @param validDelPositions: 2d array of valid positions after deletion
 * @returns {boolean}
 */
//deletes all nodes in a tree, cares about positions
export function deleteTreeNodesWPos(arrToDel, validDelPositions){

    // arrToDel.forEach(function delExpect(value, numDeletions){
    //
    // })
    function delExpect(value, numDeletions) {
        let numNodesBefore;
        let numNodesAfter;
        cy.get('input[id="delete-text-field"]').type(value)
        cy.get('#treeArea').children().then(($nodes_before)=>{
            numNodesBefore = $nodes_before.length;
            if(numNodesBefore>1){
                cy.get('button[id="delete-from-tree-bt"]').click().wait(1800).then(() => {
                    cy.get('#treeArea').children().then(($nodes_after) => {
                        numNodesAfter = $nodes_after.length
                        assert.notEqual(numNodesAfter, numNodesBefore) //make sure that the deletion occured
                        for (let index = 0; index < $nodes_after.length - numDeletions; index++) {
                            cy.get($nodes_after[index]).should('have.css', 'transform', validDelPositions[numDeletions][index])
                        }
                    })

                });
            }
            else{
                cy.get('button[id="delete-from-tree-bt"]').click().wait(1800).then(() => {
                    cy.get('#treeArea').children().should('have.length', 0)
                })
            }
        });

    }
    // should imply only one value
    if(validDelPositions.length===0){
        cy.get('input[id="delete-text-field"]').type(arrToDel[0])
        cy.get('button[id="delete-from-tree-bt"]').click()
        cy.get('.node0').should('not.be.visible');
    }
    else{
        for(let i = 0; i<arrToDel.length; i++){
            // console.log(arrToDel.length);
            delExpect(arrToDel[i],i)
        }
    }
    //assert.equal(arrToDel.length-totalDeletions, 0) // make sure that the same amount of deletions were done as needed
}



// valid rgb values
// rgb(97, 195, 255), blue
// rgb(246, 152, 44), orange
// rgb(164, 255, 79), GREEN
/**
 *
 * @param arrToSearch
 * @param validSearchPositions 1d array of positions expected, matrix format
 * @param validColors: 2d array of colors which represent all changes if value was searched, the right value, or the same
 * @returns {boolean}
 */
// searches tree for nodes, verifies positions and colors are valid throughout
export function searchTreeNodes(arrToSearch, validSearchPositions, validColors){
    if(validSearchPositions.length>=1){
        arrToSearch.forEach(function searchExpect(value, outerIndex){
            cy.get('input[id="search-text-field"]').type(value).wait(500);
            cy.get('button[id="search-tree-bt"]').click().then(()=>{
                cy.get('#treeArea').children().then(($node)=> {
                    for (let innerIndex = 0; innerIndex < $node.length; innerIndex++){
                        cy.get($node[innerIndex]).should('have.css', 'background-color',validColors[outerIndex][innerIndex])
                        cy.get($node[innerIndex]).should('have.css', 'transform',validSearchPositions[innerIndex])
                    }
                })
            });
        })
    }
    else return false;
}

//nodes are checked based on array position in case of duplicate numbers in a tree, skip is to check after
//deletions
export function checkNodesVisibleAndCorrect(arrToCheck, skipPositions = []) {
    for (let i = 0; i < arrToCheck.length; i++)
    {
         if (!skipPositions.includes(i))
         {
             cy.get('.node'+i).should('be.visible');
             cy.get('.node'+i).should('have.text', ' ' + arrToCheck[i] + ' ');
         }
         else
         {
             cy.get('.node'+i).should('not.be.visible');
         }
    }
}

export function checkNodesPosition(nodesToCheck, nodePositions) {
    for (let i = 0; i < nodesToCheck.length; i++)
    {
        cy.get('.node'+i)
            .should('have.attr', 'style')
            .should('contain', 'translateX('+nodePositions[i].x)
        cy.get('.node'+i)
            .should('have.attr', 'style')
            .should('contain', 'translateY('+nodePositions[i].y)
    }
}
exports.arrToSort = [24, 99, 37, 18, 44, 29, 11, 2, 80];
exports.arrToSort2 = [99, 90, 80, 70, 60, 50, 40, 30, 20, 10];
exports.arrToSort3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
exports.barOffset = [142.3, 332.0, 142.3, -47.4, 94.8, -47.4, -237.1, -332.0, -47.4];
exports.barOffset2 = [384, 298, 213, 128, 42, -42, -128, -213, -298, -384];
exports.barOffset3 = [0, 0, 0, 0, 0, 0, 0, 0, 0];
exports.comparisons = [['Comparing', '24', '99'], ['Comparing', '24', '37'], ['Comparing', '24', '18'], ['Comparing', '18', '44'],
    ['Comparing', '18', '29'], ['Comparing', '18', '11'], ['Comparing', '11', '02'], ['Comparing', '02', '80'], ['Swapping', '02', '24'],
    ['Comparing', '99', '37'], ['Comparing', '37', '18'], ['Comparing', '18', '29'], ['Comparing', '18', '11'],
    ['Comparing', '11', '24'], ['Comparing', '11', '80'], ['Swapping', '11', '99'], ['Comparing', '37', '18'],
    ['Comparing', '18', '44'], ['Comparing', '18', '29'], ['Comparing', '18', '99'], ['Comparing', '18', '24'],
    ['Comparing', '18', '80'], ['Swapping', '18', '37'], ['Comparing', '37', '44'], ['Comparing', '37', '29'],
    ['Comparing', '29', '99'], ['Comparing', '29', '24'], ['Comparing', '24', '80'], ['Swapping', '24', '37'],
    ['Comparing', '44', '29'], ['Comparing', '29', '99'], ['Comparing', '29', '37'], ['Comparing', '29', '80'],
    ['Swapping', '29', '44'], ['Comparing', '44', '99'], ['Comparing', '44', '37'], ['Comparing', '37', '80'],
    ['Swapping', '37', '44'], ['Comparing', '99', '44'], ['Comparing', '44', '80'], ['Swapping', '44', '99'], ['Comparing', '99', '80'],
    ['Swapping', '80', '99']];
exports.comparisons2 = [['Comparing', 99, 90], ['Comparing', 90, 80], ['Comparing', 80, 70], ['Comparing', 70, 60],
    ['Comparing', 60, 50], ['Comparing', 50, 40], ['Comparing', 40, 30], ['Comparing', 30, 20], ['Comparing', 20, 10],
    ['Swapping', 10, 99], ['Comparing', 90, 80], ['Comparing', 80, 70], ['Comparing', 70, 60],
    ['Comparing', 60, 50], ['Comparing', 50, 40], ['Comparing', 40, 30], ['Comparing', 30, 20],
    ['Comparing', 20, 99], ['Swapping', 20, 90], ['Comparing', 80, 70], ['Comparing', 70, 60],
    ['Comparing', 60, 50], ['Comparing', 50, 40], ['Comparing', 40, 30], ['Comparing', 30, 90],
    ['Comparing', 30, 99], ['Swapping', 30, 80], ['Comparing', 70, 60], ['Comparing', 60, 50],
    ['Comparing', 50, 40], ['Comparing', 40, 80], ['Comparing', 40, 90], ['Comparing', 40, 99],
    ['Swapping', 40, 70], ['Comparing', 60, 50], ['Comparing', 50, 70], ['Comparing', 50, 80],
    ['Comparing', 50, 90], ['Comparing', 50, 99], ['Swapping', 50, 60], ['Comparing', 60, 70],
    ['Comparing', 60, 80], ['Comparing', 60, 90], ['Comparing', 60, 99], ['Comparing', 70, 80],
    ['Comparing', 70, 90], ['Comparing', 70, 99], ['Comparing', 80, 90], ['Comparing', 80, 99],
    ['Comparing', 90, 99]];
exports.comparisons3 = [['Comparing', '01', '02'], ['Comparing', '01', '03'], ['Comparing', '01', '04'], ['Comparing', '01', '05'],
    ['Comparing', '01', '06'], ['Comparing', '01', '07'], ['Comparing', '01', '08'], ['Comparing', '01', '09'], ['Comparing', '02', '03'],
    ['Comparing', '02', '04'], ['Comparing', '02', '05'], ['Comparing', '02', '06'], ['Comparing', '02', '07'],
    ['Comparing', '02', '08'], ['Comparing', '02', '09'], ['Comparing', '03', '04'], ['Comparing', '03', '05'],
    ['Comparing', '03', '06'], ['Comparing', '03', '07'], ['Comparing', '03', '08'], ['Comparing', '03', '09'],
    ['Comparing', '04', '05'], ['Comparing', '04', '06'], ['Comparing', '04', '07'], ['Comparing', '04', '08'],
    ['Comparing', '04', '09'], ['Comparing', '05', '06'], ['Comparing', '05', '07'], ['Comparing', '05', '08'],
    ['Comparing', '05', '09'], ['Comparing', '06', '07'], ['Comparing', '06', '08'], ['Comparing', '06', '09'],
    ['Comparing', '07', '08'], ['Comparing', '07', '09'], ['Comparing', '08', '09']];

let sorts = ['Selection Sort', //0
    'Bubble Sort', //1
    'Insertion Sort', //2
    'Merge Sort', //3
    'Quick Sort', //4
    'Heap Sort', //5
    'Bucket Sort', //6
    'Shell Sort', //7
    'Radix Sort']; //8

export function clickAllSortsExceptN(n){
    for(let i=0; i<sorts.length; i++){
        if(i!==n){
            cy.get('button').contains(sorts[i]).click({force: true});
        }
    }
}

function checkBarOffsets(arrToSort, barOffset)
{
    if (barOffset == "none")
    {
        for (let i = 0; i < arrToSort.length; i++)
        {
            cy.react('Bar', {props: {barHeight: arrToSort[i]}})
                .should('have.attr', 'style')
                .should('not.contain', 'translateX')
        }
    }
    else
    {
        for (let i = 0; i < arrToSort.length; i++)
        {
            cy.react('Bar', {props: {barHeight: arrToSort[i]}})
                .should('have.attr', 'style')
                .should('contain', 'translateX('+barOffset[i])
        }
    }
}

export function testSort(arrToSort, barOffset, sortNum)
{
    clickAllSortsExceptN(sortNum);
    cy.get('input[id="input-numbers-to-sort"]').clear().type(arrToSort.join());
    cy.get('button').contains(new RegExp("^Play$")).click({force: true});
    cy.get('textarea[class="algorithm-log"]', {timeout: 1500000}).should("have.text", "SORTED");
    checkBarOffsets(arrToSort, barOffset);
}
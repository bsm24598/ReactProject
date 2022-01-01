class Node {
    constructor(ID, item) {
        this.ID = ID;
        this.item = item;
    }

    get value() {
        return this.item;
    }

    /**
     * Compares the value of `otherNode` to this.item
     * @param otherNode a non-null object of type `Node`
     * @returns
     *  -1 if otherNode.value < this.item
     *  0 if otherNode.value === this.item
     *  1 if otherNode.value > this.item
     * @throws 'unknown comparison error' if all the comparisons are somehow false
     * @throws 'Non-Node object passed' if !otherNode instanceof Node
     */
    compareTo(otherNode) {
        let comparison;

        if (!otherNode instanceof Node)
            throw new Error('Non-Node object passed')
        if (this.item < otherNode.value)
            comparison = -1;
        else if (this.item === otherNode.value)
            comparison = 0;
        else if (this.item > otherNode.value)
            comparison = 1;
        else {
            throw 'unknown comparison error';
        }
        return comparison;
    }

    static Compare(nodeA, nodeB) {
        return nodeA.compareTo(nodeB);
    }

    /**
     * Creates a deep copy of `existingNode`
     * AFAIK, this is the safest way to
     */
    static copy(existingNode) {
        return new Node(existingNode.ID, existingNode.value);
    }

    lessThan(nodeA, nodeB) {

    }

    //Returns true if `otherNode` has same ID
    sameNode(otherNode) {
        return (otherNode.ID === this.ID);
    }

    lessThan(otherNode) {
        return (this.compareTo(otherNode) === -1);
    }

    greaterThan(otherNode) {
        return (this.compareTo(otherNode) === 1);
    }

    equals(otherNode) {
        return (this.compareTo(otherNode) === 0);
    }

    toString() {
        return `ID: ${this.ID} value: ${this.item}`;
    }
}

/**
 * Contains a `list` of `Node` objects and methods for manipulating said list. Conceptually, a "state" is a
 *  discrete step in an algorithm. For instance, comparing two elements in a bubble sort would be one state.
 *  Swapping the elements would be the next state.
 *
 * At bare minimum, the `msg` attribute should describe what changes occurred at this step in the algorithm.
 *
 *
 *
 * The constructor accepts
 *
 */
function State(unsortedArray){
    this.list = [];
    this.step = 0;
    this.msg = "initial list created"

    for (let i = 0; i < unsortedArray.length; i++) {
        this.list.push(new Node(i, unsortedArray[i]));
    }
}

//Returns copy of node at `index`
//If null, throws error
State.prototype.nodeAt = function(index) {
    if (this.list[index] == null)
        throw new Error(`index ${index} not found`)
    return Node.copy(this.list[index]);
}

//Remove and return copy of node at `index`, resizing the list.
//Throws error if list[`index`] == null
State.prototype.removeNodeAt = function(index) {
    let node = this.nodeAt(index);
    if (node == null)
        throw new Error(`index ${index} not found`);

    this.list.splice(index, 1);
    return node;
}

//Find index of `node` using Node.sameNode
//Return -1 if not found
State.prototype.indexOf = function(node) {
    let index = -1;

    for (let i = 0; i < this.list.length; i++) {
        if (node.sameNode(this.list[i])) {
            index = i;
            break;
        }
    }
    return index;
}

State.prototype.printValues = function() {
    let nodeValues = [];
    this.list.forEach(node => nodeValues.push(node.value));
    let str = "node values: [" + nodeValues.join(' , ') + ']';
    console.log(str);
}

/**
 *
 * @param index1
 * @param index2
 */
State.prototype.swap = function(index1,index2) {
    let n1 = this.nodeAt(index1), n2 = this.nodeAt(index2);
    this.list[index1] = n2;
    this.list[index2] = n1;
}

State.prototype.swapByNode = function(nodeA, nodeB) {
    let indexA = this.indexOf(nodeA);
    let indexB = this.indexOf(nodeB);

    this.list[indexA] = null;
    this.list[indexB] = null;

    this.list[indexA] = nodeB;
    this.list[indexB] = nodeA;

}

//Prints list of nodes using `node.toString()`
//if `asColumn` specified, will print in column, showing their indices
State.prototype.printNodes = function(asColumn) {
    let nodeStrings = [];
    for (let i = 0; i < this.list.length; i++) {
        if (asColumn) {
            nodeStrings[i] = `${i}. ${this.list[i].toString()}`
        } else {
            nodeStrings[i] = this.list[i].toString();
        }
    }

    if (asColumn) {
        console.log('Nodes: {\n' + nodeStrings.join('\n') + '}')
    } else {
        console.log("Nodes: " + nodeStrings.join(' , '));
    }
    return nodeStrings;
}

//inserts Node.copy(`node`) at `index`, shifting all elements.
State.prototype.insert = function(node, index) {
    this.list.splice(index, 0, Node.copy(node));
}

/**
 * Inserts copy of `node` at `toIndex`, then removes the original occurrence of `node`
 * Array is resized, and all elements are shifted (no replacements)
 * if (toIndex == list.length) `node` will just be pushed to the end of the list
 * @throws error if (toIndex < 0 || toIndex > list.length)
 */
State.prototype.move = function(node, toIndex) {
    let indexToRemove = this.indexOf(node);
    this.insert(node, toIndex);
    this.removeNodeAt(indexToRemove);
}

//Moves `node` to index 0. Shifts all existing elements forward.
State.prototype.moveToFront = function(node) {
    let removeIndex = this.indexOf(node) + 1;
    this.list.unshift(node);
    this.removeNodeAt(removeIndex);
}
//Moves `node` to the end of the list. See `move` above. `node` must be in the list.
State.prototype.moveToRear = function(node) {
    this.move(node, this.list.length);
}

/**
 * This class stores an array of `States` which represents steps of an algorithm.
 *
 * The preferred way to use this class with a sorting algorithm is:
 *  1. call `newStateFromLast()` to to get a copy of the most recently committed State.
 *  2. modify the `State` to describe any changes made
 *  3. "commit" this modified state object by calling `commitNewState()`
 *  4. Repeat 1-3 until the algorithm is complete.
 *
 */
class StateList {
    constructor(unsortedArray) {
        this.states = []
        this.states.push(new State(unsortedArray)); //Creating 'state 0' object

        this.stateZero = {};    //For debugging. Do not modify. Ever.
        Object.assign(this.stateZero, this.states[0]);
    }

    /**
     * Returns a deep copy of the most recently committed State, with the `step` counter incremented by 1.
     * Note that any custom attributes added to the most recently committed state will appear in this object.
     */
    newStateFromLast() {
        let st = Object.create(this.states[this.states.length - 1]);
        st.step++;
        return st;
    }

    /**
     * Pushes `newState` to `this.states`
     * Enforces pass-by-value with an iron fist: `newState` is copied to a local object and pushed.
     * @throws 'duplicate step: newState.step' if the `step` field is in an existing state
     */
    commitNewState(newState) {
        this.states.forEach(state => {
            if (state.step === newState.step)
                throw new Error('duplicate step: ' + newState.step.toString());
        })

        let ns = Object.create(newState);
        Object.assign(ns, newState);
        ns.list = []
        for (let i = 0; i < newState.list.length; i++) {
            ns.list[i] = Node.copy(newState.list[i]);
        }
        this.states.push(ns);
    }

    /**
     * Returns a new "default" `state` object.
     * `step` field will be incremented by 1 from the most recently committed state
     * `list` field will be a deep copy of the `list` in the most recently committed state
     * `msg` will be an empty string
     */
    newState() {
        let currentList = Array.from(this.states[this.states.length -1].list);
        let currentStep = this.states[this.states.length - 1].step;
        return {
            list: currentList,
            step: currentStep + 1,
            msg: ""
        }
    }
}


/**
 * This represents a `NodeList` AFTER it has been completely sorted. This should be what the UI interacts with.
 *
 * The reason this is a separate class is to simplify interaction with the UI.
 */
class CompletedStateList {
    constructor(nodeList) {
        this.listA = []
        this.listB = []
        nodeList.states.forEach(state => this.listA.push(state));
        this.listB.forEach(state => this.listA.push(state));
    }

    next() {
        this.listB.push(this.listA.shift()[0]);
        return this.currentState;
    }

    previous() {
        this.listA.unshift(this.listB.pop()[0]);
        return this.currentState;
    }

    get isInitial() {
        return (this.listB.length === 0);
    }

    get isComplete() {
        return (this.listA.length === 0);
    }

    //More or less equivalent to "peek"
    get currentState() {
        return (this.isComplete) ? this.listB[this.listB.length -1] : this.listA[0];
    }
}



let debugAbove = 5;

/**
 * Just a proof-of-concept/demonstration of how to apply a sorting algorithm.
 */
function selectSort(statelist) {

    let state = statelist.newStateFromLast();
    let length = state.list.length;

    for (let sorted = 0; sorted < length-1; sorted++) {
        state.min = state.nodeAt(sorted);               //state.min is a `Node` object,
        state.selected = state.nodeAt(sorted);
        state.msg = `minimum of unsorted set to ${state.min.value}`;
        statelist.commitNewState(state);
        let minValue = state.min.value;

        for (let selectedIndex = sorted + 1; selectedIndex < length; selectedIndex++) {
            state = statelist.newStateFromLast();
            state.selected = state.nodeAt(selectedIndex);
            let selectVal = state.selected.value, minVal = state.min.value;
            let selectedIsLess = ((selectVal - minVal) < 0);
            let sign = selectedIsLess ? ' < ' : ' >= ';
            state.msg = selectVal + sign + minVal;
            statelist.commitNewState(state);
            state = statelist.newStateFromLast();

            if (selectedIsLess) {
                state.min = state.selected;
                state.msg = 'minimum of unsorted set to ' + selectVal;
                statelist.commitNewState(state);
                state = statelist.newStateFromLast();
            }
        }

        let firstUnsorted = state.nodeAt(sorted);
        if (state.min.lessThan(firstUnsorted)) {
            state.swapByNode(state.min, firstUnsorted);
            state.msg = `swapped ${state.min.value} and ${firstUnsorted.value}`;
            statelist.commitNewState(state);
            state = statelist.newStateFromLast();
        }
    }

    statelist.commitNewState(state);

    return new CompletedStateList(statelist);
}

const testdata = [8, 9, 10,7,6];
/*var id = 0;
var arrNodes = []
{testdata.map((element)=>
    arrNodes.push(new Node(id++, element))
)}
console.log(testdata)
//selectSort(arrNodes)
console.log(arrNodes)*/
let nlist = new StateList(testdata);
console.log(nlist);
const allSorted = selectSort(nlist);
console.log(nlist.states[nlist.states.length-1]);
console.log(nlist.stateZero);

//allSorted.listA.forEach(state => state.printValues());
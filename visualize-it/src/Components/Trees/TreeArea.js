import React from "react";
import TreeNode from "./TreeNode";
import {BinarySearchTree} from "./BinarySearchTree";
import anime from "animejs";
import BstControlPanel from './BstControlPanel';

class TreeArea extends React.Component {
    ARRAY_OF_BALANCED_TREES = [
        [10,5,-10,6,1,54,76,9,14,19,67],
        [50,30,20,40,70,60,80],
        [50,17,72,12,23,54,76,9,14,19,67],
        [100,50,150,25,75,125,175,65,85]
    ];

    constructor(props) {
        super(props);

        this.colors = ['#61C3FF','#F6982C','#A4FF4F','#FF0000'];
        this.maxTreeDepth = 10;
        this.treeControl = null;
        this.setTreeText = null;
        this.state = {
            treeNodes : [],
            input: '',
            bst: null,
            screenWidth :0,
            speed : 500,
            treeAreaStyle: {
                width: '75%',
                height: 1000,
                margin: 'auto',
                backgroundColor: '#252423',
            },
        }

        this.addNode = this.addNode.bind(this);
        this.addBst = this.addBst.bind(this);
        this.searchForNode = this.searchForNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.highlightNode = this.highlightNode.bind(this);
        this.animateSearch = this.animateSearch.bind(this);
        this.onNodeFound = this.onNodeFound.bind(this);
        this.disableUIPanel = this.disableUIPanel.bind(this);
        this.clearTree = this.clearTree.bind(this);
        this.exampleTrees = this.exampleTrees.bind(this);

    }

    componentDidMount() {
        this.addBst();
    }

    //notify tree to update its position (when screen size updates)
    updateTreePosition = () => {
        this.setState({ width: window.innerWidth},()=> this.state.bst.updateTreePosition());
    };

    //remove window resize listener
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateTreePosition);
    }

    // Create new Binary Search Tree then add window resize listener
    addBst(){
        this.setState({bst: new BinarySearchTree(this)},()=> window.addEventListener('resize', this.updateTreePosition));
    }

    // adds node to bst
    addNode(val){
        this.state.bst.insert(parseInt(val));
        this.disableUIPanel(true);
    }

    // searches for node containing the value val
    searchForNode(val){
        if(this.state.treeNodes.length >= 1) {
            this.state.bst.search(this.state.bst.getRootNode(), parseInt(val),false);
            this.disableUIPanel(true);
        }
        else {
            //alert("This tree is empty");
            this.setTreeText("This tree is empty")
        }
    }

    //clears tree, then adds array of values to tree
    exampleTrees(){
        let arrToSearch = this.ARRAY_OF_BALANCED_TREES[Math.floor(Math.random()*(this.ARRAY_OF_BALANCED_TREES.length))]
        arrToSearch.forEach((value)=>{
            this.state.bst.insert(value);
        })
        this.disableUIPanel(true);
    }

    // removes all nodes then empties the bst
    clearTree(examplesBool){
        this.setState({treeNodes: []}, ()=> {
            this.state.bst.clearTree();
            if(examplesBool) this.exampleTrees()
        });
    }


    removeNode(val){
        //SEARCH THEN delete!
        if(this.state.treeNodes.length >= 1) {
            this.state.bst.search(this.state.bst.getRootNode(), parseInt(val),true);
            this.disableUIPanel(true);
        }
        else {
           // alert("This tree is empty");
            this.setTreeText("This tree is empty")
        }
    }

    // creates new node and starts highlight sequence
    createNode(node,parentNode,nodeIdPath){
        let newArr = this.state.treeNodes;
        //TODO add key
        newArr.push(
            <TreeNode
                key = {node.id}
                value = {node.data}
                parent =  {(parentNode === null) ? null : parentNode.id}
                x = {node.x}
                y = {node.y}
                id = {node.id}
                ref = {React.createRef()}
            />
        );

        // Only start the highlighting process if the root is not null
        if(nodeIdPath !== null)
            this.setState({treeNodes: newArr},()=> this.highlightNewNodePath(nodeIdPath,node.data));
        else {
            this.setState({treeNodes: newArr}, () => this.state.bst.resizeTree(true));
            this.setTreeText(node.data + " added as root node")
        }
    }

    //removes node component that is being rendered
    removeTreeNode(node,leftNode,rightNode){
        let nodeParentId = null;

        if(node.parent !== null)
            nodeParentId = this.getNodeById(this.state.treeNodes,node.id).state.parent;

        let newArr = this.state.treeNodes;
        for(let i =0; i < newArr.length;i++){
            if(newArr[i].ref.current.state.id === node.id){
                newArr.splice(i,1);
                break;
            }
        }

        if(nodeParentId !== null) {
            // fix parent refs
            if (leftNode !== null && rightNode === null) {
                this.getNodeById(newArr, leftNode.id).updateParent(nodeParentId);
                console.log(nodeParentId);
            }
            if (leftNode === null && rightNode !== null) {
                this.getNodeById(newArr, rightNode.id).updateParent(nodeParentId);
                console.log(nodeParentId);
            }
        }

        this.setState({treeNodes:newArr},()=> this.state.bst.resizeTree(false));
    }

    //swaps the values of two treeNodes
    // used by special delete case of a tree with two children
    swapNodes(nodeId,auxNode){
        let newArr = this.state.treeNodes;
        for(let i =0; i < newArr.length;i++){
            if(newArr[i].ref.current.state.id === nodeId.id){
                newArr[i].ref.current.updateValue(auxNode.data);
                break;
            }
        }

        this.setState({treeNodes:newArr},()=> this.state.bst.resizeTree(false));
    }


    // returns a reference to a node in the tree by its id
    // use this when you want to grab a node
    getNodeById(arr,id){
        let nodeRef = null;
        for(let i =0; i < arr.length;i++){
            if(arr[i].ref.current.state.id === parseInt(id))
                nodeRef = arr[i].ref.current;
        }
        return nodeRef;
    }

    // Moves a node to newX and newY position
    moveNode(node, newX, newY, disableUI){

        if(disableUI)
            this.disableUIPanel(false);

        if(node !== null) {

            let nodeRef = this.getNodeById(this.state.treeNodes,node.id)


            if (nodeRef !== null) {
                anime({
                    targets: document.getElementById(node.id),
                    translateX: newX,
                    translateY: newY,
                    duration: this.state.speed,
                    easing: 'easeInOutExpo',
                    update: function () {
                        if (nodeRef.myRef.current !== null)
                            nodeRef.updatePosition(nodeRef.myRef.current.getBoundingClientRect().x, nodeRef.myRef.current.getBoundingClientRect().y);
                    },
                });
            }
        }
    }


    // Highlight a single node
    highlightNode(node,delay,doResize,currNodeVal,nodeToAddVal){
        let t = this;

        function resize(){
            t.state.bst.resizeTree(true);
            t.disableUIPanel(false);
        }

        anime({
            targets: [node],
            backgroundColor: [
                {
                    value: this.colors[1],
                    duration: this.state.speed,
                },
                {
                    value: this.colors[0],
                    duration: 0,
                },
            ],
            delay: delay,
            change: function (){
                if(parseInt(nodeToAddVal) >= parseInt(currNodeVal))
                    t.setTreeText(nodeToAddVal + " >= " + currNodeVal + ".  "  +
                        nodeToAddVal + " is placed to the right of " + currNodeVal);
                else
                    t.setTreeText(nodeToAddVal + " < " + currNodeVal + ".  " +
                        nodeToAddVal + " is placed to the left of " + currNodeVal);
            },
            complete: function() {
                if (doResize){
                    resize();
                }
            },
        });
    }


    //highlights all nodes in 'nodeIdArr'
    highlightNewNodePath(nodeIdArr,nodeToAdd){
        let delay = 0;

        for(let i =0; i < nodeIdArr.length; i++){
            if(i === nodeIdArr.length-1) {
                this.highlightNode(document.getElementById(nodeIdArr[i]), delay, true, document.getElementById(nodeIdArr[i]).innerText,nodeToAdd);
            }
            else {
                this.highlightNode(document.getElementById(nodeIdArr[i]), delay, false, document.getElementById(nodeIdArr[i]).innerText,nodeToAdd);
            }
            delay+=this.state.speed;
        }
    }


    animateSearch(node,delay,finalNode,nodeIdArr,nodeFound,data,shouldDelete){
        let color = this.colors[1];

        if(finalNode && nodeFound){
            color = this.colors[0];
            delay-=this.state.speed;
        }


        let t = this;

        anime({
            targets: [node],
            backgroundColor: [
                {
                    value: [color],
                    duration: this.state.speed,
                },
            ],
            delay: delay,


            complete: function() {
                if (finalNode){
                    if(nodeFound) {
                        t.onNodeFound(nodeIdArr,shouldDelete,data);
                        if(!shouldDelete)
                        t.setTreeText(data + " was found!")
                    }
                    else {
                        t.restoreColors(nodeIdArr);
                        //alert(data + " does not exist in the tree!");
                        t.setTreeText(data + " does not exist in the tree!")
                    }
                }
            },
        });
    }

    // highlights all nodes in 'nodeIdArr'
    // nodeIdArr is an array of all the nodes to highlight
    // nodeFound : boolean, indication that a node was found or not
    // data : number, value of node to look for
    // should delete : boolean, if true call bst to delete data from tree
    searchNodePath(nodeIdArr,nodeFound,data,shouldDelete){
        let delay = 0;

        for(let i =0; i < nodeIdArr.length; i++){
            if(i === nodeIdArr.length-1) {
                this.animateSearch(document.getElementById(nodeIdArr[i]), delay, true,nodeIdArr,nodeFound,data,shouldDelete);
            }
            else {
                this.animateSearch(document.getElementById(nodeIdArr[i]), delay, false,nodeIdArr,nodeFound,data,shouldDelete);
            }
            delay += this.state.speed;
        }
    }

    // Handles animations for when a node is found
    // expands the found node then restores the colors
    // should delete : boolean, if true call bst to delete data from tree
    onNodeFound(nodeIdArr,shouldDelete,data){

        let t = this;

        let foundNodeColor = this.colors[2];

        if(shouldDelete)
            foundNodeColor = this.colors[3];

        anime({
            targets: [document.getElementById(nodeIdArr[nodeIdArr.length-1])],
            easing: 'easeOutElastic',
            elasticity: 15,
            backgroundColor: foundNodeColor,
            scale : 1.2,
            duration: this.state.speed,
            direction: 'alternate',
            complete: function() {
                if(shouldDelete){
                    t.restoreColors(nodeIdArr);
                    t.state.bst.removeNode(t.state.bst.getRootNode(), parseInt(data));
                    t.setTreeText(data + " was deleted!")
                }
                else {
                    t.restoreColors(nodeIdArr);
                }
            },
        });
    }

   // restores colors of all nodes present in 'nodeIdArr'
   restoreColors(nodeIdArr){
       let t = this;

        for(let i =0; i < nodeIdArr.length; i++){
            anime({
                targets: [document.getElementById(nodeIdArr[i])],
                backgroundColor: t.colors[0],
                duration: 0,
                complete: function (){
                    t.state.bst.resizeTree(false);
                }
            });
        }
        t.disableUIPanel(false);
    }

    // disableUIPanel : boolean -> void
    disableUIPanel(disable){
        this.treeControl(disable);
    }

    // sets treeControl to be function from tree area
    // that disables and enables this control panel
    handleCallback = (treeControl) =>{
       this.treeControl = treeControl
    }

    handleTextCallback = (setTreeText) =>{
        this.setTreeText = setTreeText
    }


    render() {
        return (
            <div>
                <div id="tree-control-panel">
                    <BstControlPanel
                        parentCallBack = {this.handleCallback}
                        textCallBack = {this.handleTextCallback}
                        add={this.addNode}
                        search={this.searchForNode}
                        remove={this.removeNode}
                        printPostOrder={()=> this.state.bst.printTraversal(3)}
                        printInOrder={()=> this.state.bst.printTraversal(2)}
                        printPreOrder={()=> this.state.bst.printTraversal(1)}
                        clear={this.clearTree}
                        />
                </div>

                <div style={this.state.treeAreaStyle} id = {"treeArea"}>
                    {this.state.treeNodes.map(treeNode => {
                        return (
                            treeNode
                        )
                    })}
                </div>
            </div>
        )
    }

}
export default TreeArea;
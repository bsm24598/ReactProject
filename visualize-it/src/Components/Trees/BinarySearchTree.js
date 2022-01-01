/*
* SOURCES
* https://www.geeksforgeeks.org/binary-search/
* https://www.cs.usfca.edu/~galles/visualization/BST.html
 */

export class BinarySearchTree
{
    constructor(treeArea)
    {
        this.root = null;
        this.treeArea = treeArea;
        this.count =0;
        this.WIDTH  = 70;
        this.traversalText = "";
        this.HEIGHT = 45;
        this.START_Y = 35;
        this.startX = document.getElementById("treeArea").getBoundingClientRect().width/2;
        this.nodeIdPathArr = [];
        this.updateTreePosition = this.updateTreePosition.bind(this);

        //window.addEventListener('resize', this.updateTreePosition);
    }


    // Called every time the screen is resized
    updateTreePosition(){
            this.startX = document.getElementById("treeArea").getBoundingClientRect().width / 2;
            this.resizeTree(false);
    }

    insert(data)
    {
        let newNode = new Node(data);

        if(this.root === null) {
            this.root = newNode;
            newNode.x = this.startX;
            newNode.y = this.START_Y;
            newNode.id = this.count;
            this.treeArea.createNode(newNode,null,null);
            this.count++;
        }
        else {
            newNode.x = 100;
            newNode.y = 100;
            this.insertNode(this.root, newNode);
        }
    }


    insertNode(node, newNode)
    {
        this.nodeIdPathArr.push(node.id);

        if(newNode.data < node.data)
        {
            if(node.left === null) {
                node.left = newNode;
                newNode.parent = node;
                newNode.id = this.count;
                this.treeArea.createNode(newNode,node,this.nodeIdPathArr);
                this.count++;
                this.nodeIdPathArr = [];
            }
            else {
                this.insertNode(node.left, newNode);
            }
        }

        else
        {
            if(node.right === null) {
                node.right = newNode;
                newNode.parent = node;
                newNode.x = node.x + this.WIDTH/2;
                newNode.y = node.y + this.HEIGHT;
                newNode.id = this.count;
                this.treeArea.createNode(newNode,node,this.nodeIdPathArr);
                this.count++;
                this.nodeIdPathArr = [];
            }
            else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    clearTree(){
        this.root = null;
        this.count = 0;
    }


    remove(data) {
        this.root = this.removeNode(this.root, data);
        this.nodeIdPathArr = [];
    }

    removeNode(node, key) {

        if(node === null) {
            alert(key + "DNE");
            return null;
        }

        else if(key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }

        else if(key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }

        else {

            // leaf node
            if(node.left === null && node.right === null) {

                if(this.root.id === node.id){
                    this.root = null;
                }

                this.treeArea.removeTreeNode(node,null,null);
                node = null;


                return node;
            }

            // right child only
            if(node.left === null) {

                if(this.root.id === node.id){
                    this.root = node.right;
                }

                this.treeArea.removeTreeNode(node,null,node.right);
                node = node.right;

                return node;
            }

            // left child only
            else if(node.right === null) {

                if(this.root.id === node.id){
                    this.root = node.left;
                }

                this.treeArea.removeTreeNode(node,node.left,null);
                node = node.left;

                return node;
            }


            //two children
            let aux = this.findMinNode(node.right);
            node.data = aux.data;

            this.treeArea.swapNodes(node,aux);

            node.right = this.removeNode(node.right, aux.data);


            return node;
        }
    }





    // re-positions all nodes in a tree
    // disableUI : should you disable the UI control panel while resizing the tree ?
    resizeTree(disableUI) {
        let startingPoint  = this.startX;
        this.resizeNodeWidths(this.root);
        if (this.root != null) {
            if (this.root.leftWidth > startingPoint)
            {
                startingPoint = this.root.leftWidth;
            }
            else if (this.root.rightWidth > startingPoint)
            {
                startingPoint = Math.max(this.root.leftWidth, 2 * startingPoint - this.root.rightWidth);
            }
            this.updatePositions(this.root, startingPoint, this.START_Y, 0);
            this.animateMoves(this.root,disableUI);
        }
    }

    updatePositions(node, newX, newY, side) {
        if (node !== null) {
            node.y = newY;
            if (side === -1)
                newX = newX - node.rightWidth;
            else if (side === 1)
                newX = newX + node.leftWidth;
            node.x = newX;
            this.updatePositions(node.left, newX, newY + this.HEIGHT, -1)
            this.updatePositions(node.right, newX, newY + this.HEIGHT, 1)
        }
    }

    animateMoves(tree,disableUI)
    {
        if (tree !== null) {
            this.treeArea.moveNode(document.getElementById(tree.id),tree.x,tree.y,disableUI);
            this.animateMoves(tree.left,disableUI);
            this.animateMoves(tree.right,disableUI);
        }
    }

    resizeNodeWidths(node)
    {
        if (node === null)
            return 0;

        node.leftWidth = Math.max(this.resizeNodeWidths(node.left), this.WIDTH/2);
        node.rightWidth = Math.max(this.resizeNodeWidths(node.right), this.WIDTH /2);
        return node.leftWidth + node.rightWidth;
    }


    getMaxDepth(){
        return this.maxDepth(this.root);
    }

    maxDepth(node) {
        if (node !== null) {

            let lDepth = this.maxDepth(node.left);
            let rDepth = this.maxDepth(node.right);

            if (lDepth > rDepth)
                return (lDepth + 1);
            else
                return (rDepth + 1);
        }
        else {
            return 0;
        }
    }

    printTraversal(type){
        if(type ===1 ){
            this.preorder(this.root)
        }
        if (type === 2){
            this.inorder(this.root)
        }
        if(type === 3){
            this.postorder(this.root)
        }
        this.treeArea.setTreeText(this.traversalText);
        this.traversalText = "";
    }

    inorder(node)
    {
        if(node !== null)
        {
            this.inorder(node.left);
            this.traversalText += " -> " + node.data;
            this.inorder(node.right);
        }
    }

    preorder(node)
    {
        if(node !== null)
        {
            this.traversalText += " -> " + node.data;
            this.preorder(node.left);
            this.preorder(node.right);
        }
    }

    postorder(node)
    {
        if(node !== null)
        {
            this.postorder(node.left);
            this.postorder(node.right);
            this.traversalText += " -> " + node.data;
        }
    }

    findMinNode(node)
    {
        if(node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }

    getRootNode()
    {
        return this.root;
    }

    search(node, data, shouldDelete) {

        //Data is not in tree
        if(node === null) {
            this.treeArea.searchNodePath(this.nodeIdPathArr,false,data,shouldDelete);
            this.nodeIdPathArr = [];
            return null;
        }

        // Look left
        else if(data < node.data) {
            this.nodeIdPathArr.push(node.id);
            return this.search(node.left, data,shouldDelete);
        }

        // Look right
        else if(data > node.data) {
            this.nodeIdPathArr.push(node.id);
            return this.search(node.right, data,shouldDelete);
        }

        //Found data in tree
        else {
            this.nodeIdPathArr.push(node.id);
            this.treeArea.searchNodePath(this.nodeIdPathArr,true,data,shouldDelete);
            this.nodeIdPathArr = [];
            return node;
        }
    }
}

class Node
{
	constructor(data)
	{
		this.data = data;
		this.x = null;
		this.parent = null;
		this.y = null;
		this.left = null;
		this.right = null;
		this.id = null;
	}
}

import React from "react";
import nodeButtons from "../Screens/images/nodeButtons.png";
import traversalButtons from "../Screens/images/traversalButtons.png";
import treeButtons from "../Screens/images/treeButtons.png";

const TreeDocumentation = (props) => {

	return (
      <div>
            <h2>Binary Search Tree Documentation</h2>
            <br/>
            <p>
                  The binary search tree page contains a control panel for managing a single binary search tree and
                it's nodes. This panel allows users to add a node, remove a node, search for a node, generate a random
                tree, delete a tree, and print tree traversals. These features are described in detail below.
            </p>
            <br/>

            <hr></hr>

            <h3 class="doc-sub-header">
                Node Buttons
            </h3>
            <p class="doc-paragraph">
                1. The buttons for node control are located at the top of the control panel. <b> Add, Delete, and
                Search </b> will be displayed in green, red and yellow respectively. By clicking the box to the right of
                each button and entering a number with <b> 3 or less digits </b> these buttons allow interactions with
                the nodes of the tree. Add will take the number and add it's node to the binary tree, delete will
                remove the first instance of the number encountered, if any, and rebalance the children of that node,
                and search will tell you whether or not a node exists within the tree. The path's taken for each of
                these actions will be highlighted in the tree's animation and the text log will display the results
                of these actions in white at the bottom of the control panel.
            </p>
            <div class="documentation-images">
                <img src={nodeButtons} class="doc-images" alt="node buttons"></img>
            </div>

            <hr></hr>

            <h3 class="doc-sub-header">
                Tree Buttons
            </h3>
            <p class="doc-paragraph">
                2. The buttons <b> Example Tree and Clear Tree </b> do not work with individual nodes but instead will
                change the entire tree. <b>Example Tree</b> will populate the tree with random values and a height of 4.
                <b> Clear Tree</b> will remove all nodes and return the tree to an empty state.
            </p>
            <div class="documentation-images">
                <img src={treeButtons} class="doc-images" alt="tree buttons"></img>
            </div>

            <hr></hr>

            <h3 class="doc-sub-header">
                Traversal Buttons
            </h3>
            <p class="doc-paragraph">
                3. There are multiple ways to navigate binary search trees. The <b> Preorder, Inorder, and Postorder </b>
                buttons will take the current tree and show the values of each node in it's traversal, left to right, in
                the text log at the bottom of the control panel. The search order behind each option is printed below
                for reference.
                <br></br> <br></br>
                Preorder: Root, Left, Right <br></br>
                Inorder: Left, Root, Right <br></br>
                Postorder: Left, Right, Root
            </p>
            <div class="documentation-images">
                <img src={traversalButtons} class="doc-images" alt="traversal buttons"></img>
            </div>

            <hr></hr>
	</div>
	);

};

export default TreeDocumentation;
import React, {useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import ClearIcon from '@material-ui/icons/Clear';
import GroupWorkIcon from '@material-ui/icons/GroupWork';


const BstControlPanel = (props) => {


	const buttonGroupHeight = "100%";
	const textFieldHeight = "100%";
	const buttonHeight = "100%";
	const buttonMarginTop = "1.4%";
	const buttonMarginRight = "2.4%";
	const buttonFontSize = "80%";
	const textFontSize = "80%";
	const [orientation, setOrientation] = React.useState((window.innerWidth<=1000)?"vertical":"");
	const [addNodeValue, setAddNodeValue] = React.useState('');
	const [removeNodeValue, setRemoveNodeValue] = React.useState('');
	const [searchNodeValue, setSearchNodeValue] = React.useState('');
	const [disableUI, setDisableUI] = React.useState(false);
	const [text, setText] = React.useState("Add node to begin");

	const useStyles = makeStyles((theme) => ({
		margin: {
			margin: theme.spacing(1),
		},
//		bstButtonStyle: {
//			height: buttonHeight,
//			marginTop: buttonMarginTop,
//			marginRight: buttonMarginRight,
//			fontSize: buttonFontSize
//		},
		bstButtonStyle: {
			height: buttonHeight,
			marginTop: buttonMarginTop,
			marginRight: buttonMarginRight,
			fontSize: buttonFontSize,
			color: '#61C3FF',
			backgroundColor: '#292827',
		},
		buttonGroupStyle: {
			height: buttonGroupHeight,
		},
		textFieldStyle: {
			height: textFieldHeight,
			marginRight: 50,
		},
		treeTextLogStyle: {
			font:'monospace',
			color:'white',
			textAlign: 'center',
			marginTop: buttonMarginTop,

		},
		addNodeStyle:{
			height: buttonHeight,
			marginTop: buttonMarginTop,
			marginRight: buttonMarginRight,
			fontSize: buttonFontSize,
			color: '#A4FF4F',
			backgroundColor: '#292827',
		},
		deleteNodeStyle:{
			height: buttonHeight,
			marginTop: buttonMarginTop,
			marginRight: buttonMarginRight,
			fontSize: buttonFontSize,
			color: '#FF0000',
			backgroundColor: '#292827',
		},
		searchTreeStyle:{
			height: buttonHeight,
			marginTop: buttonMarginTop,
			marginRight: buttonMarginRight,
			fontSize: buttonFontSize,
			color: '#FFFF00',
			backgroundColor: '#292827',
		},
		clearTreeStyle:{
			height: buttonHeight,
			width: orientation === "vertical" ?'100%':'25%',
			marginTop: buttonMarginTop,
			marginRight: buttonMarginRight,
			fontSize: buttonFontSize,
			backgroundColor: '#292827',
		},
		exampleTreeStyle:{
			height: buttonHeight,
			width: orientation === "vertical" ?'100%':'28%',
			marginTop: buttonMarginTop,
			marginRight: buttonMarginRight,
			fontSize: buttonFontSize,
			color: '#FFFFFF',
			backgroundColor: '#292827',
		}
	}));

	useEffect(() => {
		props.parentCallBack(setDisableUI)
		props.textCallBack(setText)
	}, []);



	function setButtonGroupOrientation() {
		if(window.innerWidth <= 1000) {
			setOrientation("vertical");
		} else if(window.innerWidth > 800) {
			setOrientation("");
		}
	}

	window.addEventListener('resize', setButtonGroupOrientation);

	const buttonTheme = createMuiTheme({
		palette: {
			primary: {
				main: '#252423',
			},
			secondary: {
				main: '#61C3FF',
			},
		},
	});

	const classes = useStyles();

	function addNodeToTree(value) {
		if(!isNaN(value) && (value !== "") && (!value.includes(" "))) {
			props.add(value);
		}
		else if(value === ""){
			setText("No number input!");
		}
		setAddNodeValue("");
	}

	function deleteNodeFromTree(value) {
		if(!isNaN(value) && (value !== "") && (!value.includes(" "))) {
			//remove from tree
			props.remove(value);
		}
		else if(value === ""){
			setText("No number input!");
		}
		setRemoveNodeValue("");
	}

	function searchForNode(value) {
		if(!isNaN(value) && (value !== "") && (!value.includes(" "))) {
			props.search(value);
		}
		else if(value === ""){
			setText("No number input!");
		}
		setSearchNodeValue("");
	}

	//should add an Example Balanced Tree to the page
	function exampleBalancedTree() {
		props.clear(true);
	}

	function clearTree(){
		props.clear(false)
	}

	return (
		<div id="tree-control-panel">
			<ThemeProvider theme={buttonTheme}>
				<div id="bst-control-panel">
				<ButtonGroup

					id="tree-button-group"
					className={classes.buttonGroupStyle}
					variant="outlined"
					disabled={disableUI}
					orientation={orientation}
					aria-label="contained primary button group">
					<Button id="add-to-tree-bt"
							color="secondary"
							className={classes.addNodeStyle}
							onClick={() => addNodeToTree(addNodeValue)}>
						Add
					</Button>
					<form className={classes.root} noValidate autoComplete="off" onSubmit={e => {e.preventDefault(); addNodeToTree(addNodeValue)}}>
						<TextField
							value={addNodeValue}
							id="add-text-field"
							color='secondary'
							className={classes.textFieldStyle}
							label="Add to Tree"
							onChange={(e) => setAddNodeValue(e.target.value)}
							InputLabelProps={{
								style: {
									color: '#61C3FF',
									fontSize: textFontSize
								}
							}}
						/>
					</form>
					<Button id="delete-from-tree-bt"
							color='secondary'
							className={classes.deleteNodeStyle}
							onClick={() => deleteNodeFromTree(removeNodeValue)}>
						Delete
					</Button>
					<form className={classes.root} noValidate autoComplete="off" onSubmit={e => {e.preventDefault(); deleteNodeFromTree(removeNodeValue)}}>
						<TextField
							value={removeNodeValue}
							color="secondary"
							className={classes.textFieldStyle}
							id="delete-text-field"
							label="Remove From Tree"
							onChange={(e) => setRemoveNodeValue(e.target.value)}
							InputLabelProps={{
								style: {
									color: '#61C3FF',
									fontSize: textFontSize
								}
							}}
						/>
					</form>
					<Button id="search-tree-bt"
							color="secondary"
							className={classes.searchTreeStyle}
							onClick={() => searchForNode(searchNodeValue)}>
						Search
					</Button>
					<form className={classes.root} noValidate autoComplete="off" onSubmit={e => {e.preventDefault(); searchForNode(searchNodeValue)}}>
						<TextField
							value={searchNodeValue}
							color="secondary"
							className={classes.textFieldStyle}
							id="search-text-field"
							label="Search Tree"
							onChange={(e) => setSearchNodeValue(e.target.value)}
							InputLabelProps={{
								style: {
									color: '#61C3FF',
									fontSize: textFontSize
								} }}
						/>
					</form>
					<Button id="example-tree-bt"
							color="secondary"
							className={classes.exampleTreeStyle}
							onClick={() => exampleBalancedTree()}>
						<GroupWorkIcon/>
						Example
					</Button>
					<Button id="clear-tree-bt"
							color="secondary"
							className={classes.clearTreeStyle}
							onClick={() => clearTree()}>
						<ClearIcon/>
						Clear
					</Button>
				</ButtonGroup>
					<Grid container item xs={12} spacing={0} direction="row" justify="center">
						<ButtonGroup
							id="traversal-button-group"
							className={classes.buttonGroupStyle}
							variant="outlined"
							disabled={disableUI}
							orientation={orientation}
							aria-label="contained traversal button group">
							<Button id="preorder-bt"
									color='secondary'
									className={classes.bstButtonStyle}
									onClick={() => props.printPreOrder()}>
								Preorder
							</Button>
							<Button id="inorder-bt"
									color='secondary'
									className={classes.bstButtonStyle}
									onClick={() => props.printInOrder()}>
								Inorder
							</Button>
							<Button id="postorder-bt"
									color='secondary'
									className={classes.bstButtonStyle}
									onClick={() => props.printPostOrder()}>
								Postorder
							</Button>
						</ButtonGroup>
					</Grid>
					<p id="tree-text-log" className={classes.treeTextLogStyle}>{text}</p>
				</div>

			</ThemeProvider>
		</div>
	);

};

export default BstControlPanel;
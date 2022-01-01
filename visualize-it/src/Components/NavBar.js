import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeIcon from '@material-ui/icons/Home';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";

const NavBar = ({styles}) => {
    // https://material-ui.com/components/menus/
    const [showElem, setShowElem] = React.useState(null);

    const showMenu = (event) => {
        setShowElem(event.currentTarget);
    };

    const closeMenu = (event) => {
        setShowElem(null);
    };
    const history = useHistory();

    const useStyles = makeStyles((theme) => ({
        margin: {
            // margin: theme.spacing(1),
        },
        marginRight: {
            // marginRight: theme.spacing(10),
        },
        homeIconStyle: {
            // marginLeft: theme.spacing(3),
            height: 50
        },
        teamNameButtonStyle: {
            // marginLeft: theme.spacing(1),
            fontSize: 25,
            color: '#61C3FF',
            height: 50,
        },
        navButtonStyle: {
            height: 50
        }
    }));


    function sendToHomePage() {
        history.push({
            pathname: '/'
        });
    }

    function sendToAboutPage() {
        history.push({
            pathname: '/About'
        })
    }

    function sendToSortingPage() {
        history.push({
            pathname: '/Sorting-Algorithms'
        })
    }

    function sendToTreePage() {
        history.push({
            pathname: '/Trees'
        })
    }


    function closeMenuAndSendToHomePage(){
        closeMenu();
        sendToHomePage()
    }
    const classes = useStyles();

    // const NavBarStyle = {};

    return (
        <div>
            <AppBar position={"static"}>
                <Toolbar id={"nav-bar"}>
                    <Button color="inherit" variant="outlined" className={classes.teamNameButtonStyle}
                            onClick={sendToHomePage}
                            id={"logo-vi"}>Visualize-IT</Button>
                    <IconButton id="nav-home-bt" className={classes.homeIconStyle} edge="start" color="inherit"
                                aria-label="home" onClick={sendToHomePage}>
                        <HomeIcon/>
                    </IconButton>
                    <Button id="nav-about-bt" color="inherit" className={classes.navButtonStyle} onClick={sendToAboutPage}>About</Button>
                    <Button id="nav-sortingalgos-bt" color="inherit" className={classes.navButtonStyle} onClick={sendToSortingPage}>Sorting
                        Algorithms</Button>
                    <Button id="nav-bst-bt" color="inherit" className={classes.navButtonStyle} onClick={sendToTreePage}>Binary Search
                        Trees</Button>
                </Toolbar>
                <div id={"hamburger"}>
                    <Button color="inherit" size='large' variant="outlined" className={classes.teamNameButtonStyle}
                            onClick={sendToHomePage}
                            id={"logo-vi2"}>Visualize-IT</Button>
                    <IconButton id={"hamburger-button"} aria-controls="simple-menu"  aria-haspopup="true" onClick={showMenu}><MenuIcon/></IconButton>

                    <Menu
                        id={"simple-menu"}
                        anchorEl={showElem}
                        // keepMounted
                        open={Boolean(showElem)}
                        onClose={closeMenu}
                    >
                        <MenuItem id="hmbrgr-home-bt" onClick={closeMenuAndSendToHomePage}>Home</MenuItem>
                        <MenuItem id="hmbrgr-about-bt" onClick={sendToAboutPage}>About</MenuItem>
                        <MenuItem id="hmbrgr-sortingalgos-bt" onClick={sendToSortingPage}>Sorting Algorithms</MenuItem>
                        <MenuItem id="hmbrgr-bst-bt" onClick={sendToTreePage}>Binary Search Trees</MenuItem>
                    </Menu>
                </div>
            </AppBar>

        </div>
    );
};

export default NavBar;
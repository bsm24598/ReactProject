import React from "react";
import AppBar from '@material-ui/core/AppBar';
import { useHistory } from "react-router-dom";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import Info from '@material-ui/icons/Info';
import Home from '@material-ui/icons/Home';
import BarChart from '@material-ui/icons/BarChart';
import Tree from '@material-ui/icons/Share';
import Copyright from '@material-ui/icons/CopyrightOutlined';

const Footer = ({ styles }) => {

    const history = useHistory();
    const [value, setValue] = React.useState(determineValue);

    const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    bottomNavigationActionStyle: {
        color: '#61C3FF',
        height: 50,
        width: 50,
    },
    rotateIcon: {
        transform: "rotate(90deg)"
    },
    copyrightNavigationActionStyle: {            
        color: '#61C3FF',
        height: 50,
        width: 50,
    },
    VistualizeItNavigationActionStyle: {
        fontSize: 50,
        color: 'white',
        height: 50,
        width: 50,
    },
    marginRight: {
        marginRight: theme.spacing(10),
    },
    teamNameButtonStyle: {
        marginLeft: theme.spacing(1),
        fontSize: 25,
        color: '#61C3FF',
        height: 50,
    },
    footer: {
        width:"100%",
        bottom: 'auto',
    }
    }));

    const classes = useStyles();

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

    function determineValue() {

        let currentPath = window.location.pathname;

        if(currentPath === "/tm-repo-se-team-3-visualize-it/Sorting-Algorithms") {
            return 3;
        } else if(currentPath === "/tm-repo-se-team-3-visualize-it/Home") {
            return 1;
        } else if(currentPath === "/tm-repo-se-team-3-visualize-it/Trees") {
            return 4;
        } else if(currentPath === "/tm-repo-se-team-3-visualize-it/About") {
            return 2;
        } else {
            return 1;
        }
    }

    function sendToSortingAlgorithmsPage() {
        history.push({
            pathname: '/Sorting-Algorithms'
        })
    }

    function sendToBinarySearchTreesPage() {
        history.push({
            pathname: '/Trees'
        })
    }

    const BottomNavigationStyle = {
        background: '#252423',
        paddingTop: 50,
        paddingBottom: 50
    };

    return (
        <div>
            <AppBar  position="sticky" className={classes.footer}>
                <BottomNavigation value={value} style={BottomNavigationStyle} onChange={(event, newValue) => {setValue(newValue);}} className={classes.root} showLabels>
                    <BottomNavigationAction id="ftr-visIT-bt" label="Visualize IT" className={classes.VistualizeItNavigationActionStyle} icon={<BarChart/>}/>
                    <BottomNavigationAction id="ftr-home-bt" label="Home" className={classes.bottomNavigationActionStyle} onClick={sendToHomePage} icon={<Home/>} />
                    <BottomNavigationAction id="ftr-about-bt" label="About" className={classes.bottomNavigationActionStyle} onClick={sendToAboutPage} icon={<Info/>} />
                    <BottomNavigationAction id="ftr-sortingalgos-bt" label="Sorting Algorithms" className={classes.bottomNavigationActionStyle} onClick={sendToSortingAlgorithmsPage} icon={<BarChart />}/>
                    <BottomNavigationAction id="ftr-bst-bt" label="Binary Search Tress" className={classes.bottomNavigationActionStyle} onClick={sendToBinarySearchTreesPage} icon={<Tree className={classes.rotateIcon}/>}/>
                    <BottomNavigationAction id="ftr-copyright-bt" label="Copyright 2020" className={classes.copyrightNavigationActionStyle} icon={<Copyright/>}/>
                </BottomNavigation> 
            </AppBar>
        </div>
    );
};

export default Footer;
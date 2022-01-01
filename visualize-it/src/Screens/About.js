import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';
import SortingDocumentation from "../Components/SortingDocumentation";
import TreeDocumentation from "../Components/TreeDocumentation";
import AboutVisualizeIt from "../Components/AboutVisualizeIt";

const About = () => {


    const useStyles = makeStyles((theme) => ({
    buttonToggleStyle: {
        backgroundColor: '#61C3FF',
    },
    buttonStyle: {
        color: 'red'
    },
    binaryTreeDocumentation: {

    },
    sortingAlgorithmDocumentation: {

    },
    aboutVisualizeIt: {

    },
    hidden: {
        display: 'none',
    }
    }));

    const classes = useStyles();
    const [hideTreeDiv, setHideTreeDiv] = React.useState(true);
    const [hideSortDiv, setHideSortDiv] = React.useState(true);
    const [hideAboutDiv, setHideAboutDiv] = React.useState(false);

    function showHideDocs(type) {
        if(type === 'sort') 
        {
            setHideTreeDiv(true);
            setHideAboutDiv(true);
            setHideSortDiv(false);
        } 
        else if(type === 'tree') 
        {
            setHideSortDiv(true);
            setHideAboutDiv(true);
            setHideTreeDiv(false);
        } else if(type === 'about')
        {
            setHideSortDiv(true);
            setHideTreeDiv(true);
            setHideAboutDiv(false);
        }
    }

    return (
        <div>
            <NavBar/>
            <br/>

            <div id="documentation-button-group">

                <ButtonGroup disableElevation variant="contained" color="primary" >
                    <Button  
                        style={{ color: hideAboutDiv? '' : 'white', background: hideAboutDiv ? '' : '#61C3FF' }} 
                        id="about-doc-button" 
                        onClick={() => showHideDocs('about')}>
                        About Visualize IT
                    </Button>

                    <Button  
                        style={{ color: hideSortDiv ? '' : 'white', background: hideSortDiv ? '' : '#61C3FF' }} 
                        id="sorting-doc-button" 
                        onClick={() => showHideDocs('sort')}>
                        Sorting Algorithm Documentation
                    </Button>

                    <Button 
                        style={{ color: hideTreeDiv ? '' : 'white', background: hideTreeDiv ? '' : '#61C3FF' }} 
                        id="binary-doc-button" 
                        onClick={() => showHideDocs('tree')}>
                        Binary Search Tree Documentation
                    </Button>

                </ButtonGroup>  
            </div>

            <div className={"documentation-page"}>
                <div className={"space"}>
                </div>


                <div id={"documentation-area"}>

                    <div 
                        id="about-visualize-it" 
                        className={hideAboutDiv ? classes.hidden : classes.aboutVisualizeIt}>
                        <AboutVisualizeIt/>
                    </div>

                    <div 
                        id="sorting-algorithms-documentation" 
                        className={hideSortDiv ? classes.hidden : classes.sortingAlgorithmDocumentation}>
                        <SortingDocumentation/>
                    </div>

                    <div 
                        id="binary-tree-documentation" 
                        className={hideTreeDiv ? classes.hidden : classes.binaryTreeDocumentation}>
                        <TreeDocumentation/>
                    </div>
                </div>


                <div className={"space"}>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default About;
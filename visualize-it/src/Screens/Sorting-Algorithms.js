import React from "react";
import NavBar from "../Components/NavBar";
import InputArea from "../Components/InputArea";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../Components/Footer";

const SortingAlgorithms = () => {

    const algorithmButtonFontSize = "80%";

    const useStyles = makeStyles((theme) => ({
    playAllStyle: {
        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(3),
        fontSize: 20,
        color: '#A4FF4F',
        backgroundColor: '#292827',
        height: 30,
        width: 150,
        boxShadow: '2px 1px #0E0E0E',
        marginLeft: 6,
        marginRight: 6,
        marginTop: 2,
    },
    resetAllStyle: {
        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(3),
        fontSize: 20,
        color: 'red',
        backgroundColor: '#292827',
        height: 30,
        width: 150,
        boxShadow: '2px 1px #0E0E0E',
        marginLeft: 6,
        marginRight: 6,
        marginTop: 2,
    },
    toggleValuesStyle: {
        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(3),
        fontSize: 20,
        color: 'yellow',
        backgroundColor: '#292827',
        height: 30,
        width: 250,
        boxShadow: '2px 1px #0E0E0E',
        marginLeft: 6,
        marginRight: 6,
        marginTop: 2,
    },
    sortingAlgorithmButtonStyle: {
        //marginLeft: theme.spacing(1),
        //marginRight: theme.spacing(3),
        fontSize: 16
    },
    typographyStyle: {
        // marginLeft: theme.spacing(3),
        // marginTop: theme.spacing(0),
        // marginRight: theme.spacing(3),
        fontSize: 20,
        color: '#F6F4F2'
    },
    inputNumberTypographyStyle: {
        // marginTop: theme.spacing(1),
        // marginLeft: theme.spacing(4),
        // marginRight: theme.spacing(3),
        fontSize: 20,
        color: '#F6F4F2'
    },
    navButtonStyle: {
        height: 50
    },
    textFieldStyle: {
        width: 400,
        color: 'white',
        // marginTop: theme.spacing(3),
        // marginBottom: theme.spacing(2)
    },
    algorithmSelection: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(3),
        fontSize: 15,
        color: '#61C3FF',
        height: 30
    },
    algorithmOptionsStyle: {
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(3),
        fontSize: algorithmButtonFontSize,
        color: '#61C3FF',
        backgroundColor: '#292827',
        height: 30,
        width: 150,
        marginLeft: 6,
        marginRight: 6,
        marginTop: 2,
        boxShadow: '2px 1px #0E0E0E'
    },
    noVisibleChartsStyle: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        height: '400px',
        textAlign: 'center'
    },
    icon: {
        color:'white',
        fill:'white'
    },
    }));

    const classes = useStyles();

    return (
        <div >
            <NavBar/>
            <InputArea style={classes}/>
            <Footer />
        </div>
    );
};

export default SortingAlgorithms;
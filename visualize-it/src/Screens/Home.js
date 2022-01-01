import React from "react";
import NavBar from "../Components/NavBar";
import HomeOptions from "./HomeOptions";
import bar_chart from "./bar_chart.png"
import trees from "./trees.png"
//import Bar from "../Components/Bar";
import { Link } from "react-router-dom/esm/react-router-dom";
import Footer from "../Components/Footer";

const Home = () => {
    // const useStyles = makeStyles(theme => ({
    //     offset: theme.mixins.toolbar,
    // }))
    //const classes = useStyles();
    //const barVals = [55,45,65,55,75]

    // function bars(){
    //     return (
    //     barVals.map(function (bar, index) {
    //         return <Bar barHeight={bar}
    //                     margin={1}
    //                     onePixel={99 / Math.max(...barVals)}
    //                     barIndex={index}
    //                     ref={React.createRef()}
    //                     />
    //     }))
    // }

    return (
        <div>
            <NavBar/>
            <div className={"home-page"}>
                {/*<div className={"space"}>*/}
                {/*    {()=>bars}*/}
                {/*</div>*/}
                <div id={"title-area"}>
                    <h1 class="home-page-headings">HOME</h1>
                    <h3>Visualize-IT aims to make clear the subjects of intermediate level computer science courses
                        through visualization. These subjects include:</h3>
                </div>
            </div>
            <br/>
            <div className={"home-page"}>
                <div className={"space"}>
                </div>
                <div id={"hm-options-ar"}>
                    <Link to={{ pathname: '/sorting-algorithms'}} style={{ color: 'white', textDecoration:'none' }}>
                        <HomeOptions id={"sorting-algos"}
                                    heading={"SORTING ALGORITHMS"}
                                    text={"Sorting algorithms are taught in intermediate level computer science courses because they\n" +
                                    "provide a foundation for looping, and analysis.\n" +
                                    "Visualize-IT takes several sorting algorithms taught in these classes and visualizes them\n" +
                                    "to attempt to help students understand how they work.\n" +
                                    "Click here to see this in action."}
                                    underconstruction={false}
                                    img={bar_chart}
                                    side={"left"}/>
                    </Link>


                    <Link to={{ pathname: '/trees'}} style={{ color: 'white', textDecoration:'none' }}>
                        <HomeOptions id={"trees"}
                                    heading={"BINARY SEARCH TREES"}
                                    text={"Binary Search trees are a data structure frequently taught in intermediate level computer science courses.\n" +
                                    "They provide a way to store data, traverse data and rebalance that data in an efficient manner. Click here to see how they work."}
                                    underconstruction={false}
                                    img={trees}
                                    side={"right"}/>
                    </Link>
                </div>
                <div className={"space"}>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
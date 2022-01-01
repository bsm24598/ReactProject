import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import TreeArea from "../Components/Trees/TreeArea";


const Trees = () => {

    return (
        <div >
            <NavBar/>
              <TreeArea />
            <Footer/>
        </div>
    );
};

export default Trees;
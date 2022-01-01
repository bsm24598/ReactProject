import React from "react";
import projectDemo from "../Screens/images/display.png";

const AboutVisualizeIt = (props) => {

	return (
      <div>
            <h2>About Visualize IT</h2>
            <hr></hr>
            <h3 class="doc-sub-header">
                Project Goal
            </h3>
            <p class="doc-paragraph">
                Visualize IT aims to make clear the subject of intermediate level computer science courses
                through visualization. 
            </p>
            <br />
            <div class="documentation-images">
                <img src={projectDemo} class="doc-images" alt="project demo"></img>
            </div>

            <hr></hr>

            <h3 class="doc-sub-header">
                Our Team
            </h3>
            <p class="doc-paragraph">
                Visualize IT consisted of 6 Radford University Computer Science Software Engineering students. This project was completed
                over the course of two semesters. It began in the Fall of 2020 and concluded in the Spring of 2021.  
            </p>
            <br />

            <hr></hr>

	</div>
	);

};

export default AboutVisualizeIt;
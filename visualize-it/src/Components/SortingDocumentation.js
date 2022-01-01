import React from "react";
import controlPanelImage from "../Screens/images/controlPanelImage.png";
import algorithmButtons from "../Screens/images/controlPanelAlgorithmButtons.png";
import inputNumbers from "../Screens/images/inputNumbers.png";
import animationSpeed from "../Screens/images/animationSpeed.png";
import algorithmInformation from "../Screens/images/algorithmInformation.png";
import algorithmControlButtons from "../Screens/images/algorithmControlButtons.png";

const SortingDocumentation = (props) => {

	return (
		<div>
            <h2>Sorting Algorithm Documentation</h2>
            <br/>
            <p>
                The sorting algorithms page contains a control panel which contains global controls,
                sorting algorithm buttons, a place to input numbers, and an animation speed selector. Below the
                control panel you'll find algorithm charts with information displayed below the bar chart as well as
                their individual control buttons. Each is described in detail below.
            </p>
            <br/>

            <hr></hr>

            <h3 class="doc-sub-header">
                Control Panel Global Buttons
            </h3>
            <p class="doc-paragraph">
                1. In the example below, the <b>Play All</b>, <b>Reset All</b>, and <b>Toggle Values</b> Buttons
                    are considered <b>Global Controls</b> for the sorting algorithms. This means they will
                    affect all sorting algorithms that are visible on the page. The <b>Play All</b> and <b>Reset All </b>
                    buttons control chart animations, while the <b>Toggle Values</b> button turns on and off numerical
                    representation for each bar.
            </p>
            <div class="documentation-images">
                <img src={controlPanelImage} class="doc-images" alt="control panel"></img>
            </div>

            <hr></hr>

            <h3 class="doc-sub-header">
                Sorting Algorithm Buttons
            </h3>
            <p class="doc-paragraph">
                2. The sorting algorithms buttons add and remove their respective charts to the list of displayed
                animations. All algorithms are set to display by default as indicated by their blue outline. Clicking
                a sorting algorithm button will hide that algorithm's chart and remove the button's blue outline.
                When a deactivated button is clicked again it will reactivate and display the chart.
            </p>
            <div class="documentation-images">
                <img src={algorithmButtons} class="doc-images" alt="algorithm buttons"></img>
            </div>

            <hr></hr>

            <h3 class="doc-sub-header">
                Input Numbers
            </h3>
            <p class="doc-paragraph">
                3. The input numbers bar is where the numbers to be sorted by the algorithms are displayed.
                By default they are populated by a random list of <b>15</b> numbers. Clicking the <b>generate random
                values button</b> to the right of the input area will populate it with a new list of random numbers.
                Custom values can be added by clicking the input area and entering any list of
                <b> two digit numbers separated by commas</b>. The charts will update automatically as the numbers
                are entered
            </p>
            <div class="documentation-images">
                <img src={inputNumbers} class="doc-images" alt="input numbers"></img>
            </div>

            <hr></hr>

            <h3 class="doc-sub-header">
                Animation Speed
            </h3>
            <p class="doc-paragraph">
                4. The animation speed selector allows for the speed of the animations to be set to <b>
                very slow, slow, fast, very fast </b> and starts at a <b> default </b> value which is a medium speed.
                These options display in a drop down menu when the arrow icon is clicked and will apply to all animations.
            </p>
            <div class="documentation-images">
                <img src={animationSpeed} class="doc-images" alt="animation speed"></img>
            </div>

            <hr></hr>

            <h3 class="doc-sub-header">
                Algorithm Information
            </h3>
            <p class="doc-paragraph">
                5. Below the bar chart animation is the algorithm information area. Here you will find the name of the
                selected sorting algorithm in green text. Next to that you will see the animations text log
                which will describe the steps the sort is taking in real time.
            </p>
            <div class="documentation-images">
                <img src={algorithmInformation} class="doc-images" alt="algorithm information"></img>
            </div>

            <hr></hr>

            <h3 class="doc-sub-header">
                Algorithm Buttons
            </h3>
            <p class="doc-paragraph">
                6. Underneath the algorithm information area there are several buttons which pertain to only the chart
                that they are attached to: <b> play, pause, reverse, restart and info. </b> The first four
                buttons control the animations. Hovering over the info button will display the best,
                worst, and average time complexity of that chart's sorting algorithm. The time complexity shows the
                number of steps needed to sort a list of length N.
            </p>
            <div class="documentation-images">
                <img src={algorithmControlButtons} class="doc-images" alt="algorithm control buttons"></img>
            </div>

            <hr></hr>

		</div>
	);

};

export default SortingDocumentation;
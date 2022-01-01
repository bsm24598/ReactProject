import React from "react";

class Bar extends React.Component {
    // Represents a single bar component, gives styling based on inputted values
    colors = ['#3dc3f9','#ffffff','#a4ff4f'];//, "red", "orange", "purple"];
    colorNum = 0;
    divRef = React.createRef();
    constructor(props) {
        super(props);

        this.state = {
            displayBarHeight: props.displayBarHeight,
            barHeight: props.barHeight,
            onePixel: props.onePixel,
            barIndex: props.barIndex,
            margin: props.margin + "px ",
            moving: false,
            barStyle: {
                height: Math.floor((props.barHeight * props.onePixel)) + "%",
                //width: this.props.barWidth,
                width:"100%",
                backgroundColor: this.colors[this.colorNum],
                margin: props.margin + "px " + props.margin + "px 0px " + props.margin + "px",
                textAlign: "center",
                paddingBottom: '12px',
                fontSize: '12px',
                textIndent :'100%',
                overflow : 'hidden',
                whiteSpace : 'nowrap'
            },
        }
        this.toggleDisplayBarHeight = this.toggleDisplayBarHeight.bind(this);
    }
    componentDidMount() {
        this.updateDisplayBarHeight();
    }

    // Updates each bar to either show or hide the barHeight
    updateDisplayBarHeight()
    {
        if(this.state.displayBarHeight === false) {
            this.divRef.current.style.textIndent = '100%';
            this.divRef.current.style.whiteSpace = 'nowrap';
            this.divRef.current.style.overflow = 'hidden';
        }
        else {
            this.divRef.current.style.textIndent = '0%';
            this.divRef.current.style.whiteSpace = 'wrap';
            this.divRef.current.style.overflow = 'visible';
        }
    }

    toggleDisplayBarHeight(show)
    {
        this.setState({displayBarHeight: show},()=> this.updateDisplayBarHeight());
    }

    // Adds a 0 to any single digit number
    // This keeps the bar at a consistent width
    getBarHeightDisplay() {
        if (this.state.barHeight.toString().length === 1)
            return "0" + this.state.barHeight;

        return "" + this.state.barHeight;
    }

    render() {
        return (
            <div style={this.state.barStyle} ref={this.divRef}>
                <div>
                    <p>
                        {this.getBarHeightDisplay()}
                    </p>
                </div>
            </div>
        )
    }
}
export default Bar;
import React from "react";
class HomeOptions extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            heading: props.heading,
            hover: false,
            styling: {
                backgroundColor: '#252423',
                transition: "0.5s",
                borderRadius: "2px",
                padding: "3px",
            },
        }
        this.hovering = this.hovering.bind(this);
    }

    hovering(){
        const newBGColor = {
            backgroundColor:(this.state.hover?"#252423": "#3f3e3c"),
            transition: "0.5s",
            borderRadius: (this.state.hover?"2px":"10px"),
            padding: "3px",
        }
        this.setState({hover: !this.state.hover}, ()=> this.setState({styling : newBGColor}));
    }
    componentImage(){
        return(
            <img className={"images"} src={this.props.img} alt="Homepage Illustration"/>
        )
    }


    render() {
        return (
            <div>
                <h2 class="home-page-headings">{this.props.heading}</h2>
                {(this.props.underconstruction?<p className={"under-prod"}>(Under Construction)</p>:console.log())}
                <div className={"home-opts"} id={this.props.id} style={this.state.styling} onMouseEnter={this.hovering} onMouseLeave={this.hovering}>
                    {this.props.side==="left"?this.componentImage(): undefined}
                    <p>
                        {this.props.text}
                    </p>
                    {this.props.side==="right"?this.componentImage(): undefined}
                </div>
                <hr/>
            </div>
        );
    };
}
export default HomeOptions;
import React from "react";
import LineTo from 'react-lineto';

class TreeNode extends React.Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.width = 35;
        this.height = 35;

        this.state = {
            value: props.value,
            parent: props.parent,
            x: props.x,
            y: props.y,
            id: props.id,

            treeNodeStyle: {
                position: 'absolute',
                width: this.width,
                height: this.height,
                border: '2px solid lightblue',
                borderRadius: '50%',
                fontSize: 15,
                color: 'white',
                textAlign: 'center',
                background: '#61C3FF',
                zIndex: 2,
            },
        }


        this.updatePosition = this.updatePosition.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.updateID = this.updateID.bind(this);
        this.updateValue = this.updateValue.bind(this);
    }


    updatePosition(newX,newY){
        //this.myRef.current.style.transform = 'translate('+newX+'px, '+newY+'px)';
        this.setState({x:newX, y:newY});
    }

    updateID(newId){
        this.setState({id:newId});
    }

    updateParent(newParent){
        this.setState({parent: newParent});
    }

    updateValue(newVal){
        this.setState({value: newVal});
    }


    render() {
        return (
            <div style={this.state.treeNodeStyle} id = {this.state.id} ref = {this.myRef} className={"node"+this.state.id}>
                <p> {this.state.value} </p>
                {this.state.parent !== null &&
                    <LineTo from={"node"+this.state.id} to={"node"+this.state.parent} borderColor={"white"} zIndex={1} borderWidth={5} />
                }
            </div>
        )
    }
}
export default TreeNode;
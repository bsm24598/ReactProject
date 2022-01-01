import React from "react";
import Bar from './Bar'
import '../index.css'
import {Animator} from "./Animator";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Play from '@material-ui/icons/PlayArrow';
import Pause from '@material-ui/icons/Pause';
import Reverse from '@material-ui/icons/SkipPrevious';
import Restart from '@material-ui/icons/SettingsBackupRestore';
import Info from '@material-ui/icons/HelpOutline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import ReactTooltip from 'react-tooltip';

class ChartArea extends React.Component {
    // Represents the area with the bar container,
    constructor(props){
        super(props);
        this.state ={
            arr: props.arr,
            show: props.show,
            //arrBars: [],
            arrBars: props.barArr,
            sorted:false,
            //states:new StateList(props.arr),
            currState:null,
            animator: null,
            sortType: props.sortType,
            text : "UNSORTED",
            tickRate: 500,
            displayBarHeight: props.displayBarHeight,
        }
        this.updateChart = this.updateChart.bind(this);
        this.setAllBars = this.setAllBars.bind(this);
        this.hideUnhide = this.hideUnhide.bind(this);
        this.setArr = this.setArr.bind(this);
        this.addAnimator = this.addAnimator.bind(this);
        this.changeText = this.changeText.bind(this);
        this.boundsNotMet = this.boundsNotMet.bind(this);
        this.toggleDisplayBarHeight = this.toggleDisplayBarHeight.bind(this);
    }
    maxBars = Math.max(...this.props.arr);
    onePixel = 99/this.maxBars;
    margin = 1; //will be passed to all Bar components
    barWidth = Math.ceil((100 - this.props.arr.length) / this.props.arr.length) + "%";
    sortedArr = [];

    componentDidMount() {
        //passed props handles showing and setting array
        //console.log("COMPONENT DID MOUNT BOUT TO SET ALL BARS")
        this.setAllBars(this.props.barArr)

    }

    updateChart(newChartState) {
        if (newChartState.tickRate)
            this.setState({tickRate: newChartState.tickRate})
        this.setArr(newChartState.arr)
        this.hideUnhide(newChartState.show)
    }

    // toggles bar height for each bar
    toggleDisplayBarHeight(show)
    {
        this.setState({displayBarHeight: show});
        for(let i =0; i < this.state.arrBars.length;i++)
        {
            if(this.state.arrBars[i].ref.current != null)
                this.state.arrBars[i].ref.current.toggleDisplayBarHeight(show);
        }
    }

    // creates new bars with values of the inputted array
    setAllBars(arrNums){
        //console.log(Math.floor((cshartDivWidthPerc - margin * 2 * props.arr.length) / props.arr.length));
        let arrOfValues = this.state.arr;
        let bars = [];

        for (let i = 0; i < arrOfValues.length; i++) {
            bars.push(<Bar key={i.toString()}
                           barHeight={arrOfValues[i]}
                           margin={this.margin}
                           onePixel={99/Math.max(...this.state.arr)}
                           barIndex={i}
                           ref = {React.createRef()}
                           displayBarHeight = {this.state.displayBarHeight}
                           barWidth={this.barWidth}/>);
        }
        this.setState({arrBars: bars},()=> this.addAnimator())
    }
    // Creates and adds animator object
    addAnimator() {

        this.changeText("UNSORTED");

        if (this.state.show === true) // prevents null error because animator constructor depends on bars being already being rendered
        {
            if(this.state.arr.length > 0)
            {
                if(this.state.animator != null)
                {
                    this.state.animator.pause();
                }
                this.setState({animator : new Animator(this.state.arrBars,this.state.sortType,this.changeText,
                        this.state.tickRate)});
            }
        }
    }

    changeText(t)
    {
        this.setState({text:t});
    }


    // sets the array, and since the array is changing, so should the bars
    setArr(newArr){
        this.setState({arr:newArr}, ()=>this.setAllBars())
    }
    //sets state to passed param, expects boolean
    hideUnhide(showParam){
        // TODO : IMPLEMENT A WAY FOR THE VALUES TO GO BACK TO THE ORIGINAL ARRAY WHEN THE CHART HAS BEEN HIDDEN BY THE USER
        // test the origArr statement with 5 4 3 2 1 -> sort the arrays -> remove a chartarea -> place it back
        // expected result : bars with 5 4 3 2 1
        this.setState({show:false},()=> this.setState({show:showParam}));
    }

    activateAnimator(number) {
        if(number === 0) {
            this.state.animator.play();
        } else if(number === 1) {
            this.state.animator.pause();
        } else if(number === 2) {
            this.state.animator.reverse();
        } else if(number === 3) {
            this.state.animator.restart();
        }
    }

    BottomNavigationStyle = {
        background: '#252423',
        paddingTop: 2,
        paddingBottom: 2,
        
    };

    inputAreaButtonStyle = {
        height: 40,
        color: '#61C3FF'
    }

    inputAreaAlgorithmName = {
        fontSize: 20,
        color: 'white',

    }

    appBarStyle = {
        border: 'none',
        textShadow: 'none',
        marginTop: 2
    }

    boundsNotMet(){
        const stylin = {
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            height:"100%",
            width:"100%",
            textAlign:"center",
            color: "white"
        }
        return(
            <div style={stylin}>
                <p>MUST HAVE BETWEEN 3 AND 100 NUMBERS</p>
            </div>
        )
    }

    timeComplexity(name) {
        switch (name) {
            case 'selectionSort':
                return "Selection Sort <br /> Best (Omega): Ω(N²)<br /> Average (Theta): Θ(N²)<br /> Worst (Big-O): O(N²)";
            case 'bubbleSort':
                return "Bubble Sort <br /> Best (Omega): Ω(N)<br /> Average (Theta): Θ(N²)<br /> Worst (Big-O): O(N²)";
            case 'insertionSort':
                return "Insertion Sort <br /> Best (Omega): Ω(N)<br /> Average (Theta): Θ(N²)<br /> Worst (Big-O): O(N²)";
            case 'mergeSort':
                return "Merge Sort <br /> Best (Omega): Ω(Nlog(N))<br /> Average (Theta): Θ(Nlog(N))<br /> Worst (Big-O): O(Nlog(N))";
            case 'quickSort':
                return "Quick Sort <br /> Best (Omega): Ω(Nlog(N))<br /> Average (Theta): Θ(log(N))<br /> Worst (Big-O): O(N²)";
            case 'heapSort':
                return "Heap Sort <br /> Best (Omega): Ω(Nlog(N))<br /> Average (Theta): Θ(Nlog(N))<br /> Worst (Big-O): O(Nlog(N))";
            case 'bucketSort':
                return "Bucket Sort <br /> Best (Omega): Ω(N+K)<br /> Average (Theta): Θ(N+K)<br /> Worst (Big-O): O(N²)";
            case 'shellSort':
                return "Shell Sort <br /> Best (Omega): Ω(log(N))<br /> Average (Theta): Θ(log(N))<br /> Worst (Big-O): O(N²)";
            default:
                return "Radix Sort <br /> Best (Omega): Ω(N+K) <br /> Average (Theta): Θ(N+K) <br /> Worst (Big-O): O(N+K)";

        }
    }

    render() {
        if(!this.state.show){
            return null;
        }
        return (
            <div className={"chart-div"}>
                <div className={"finished-bar"}>
                    <div className={"bar-container"}>
                        {((this.state.arrBars.length>=3)&&(this.state.arrBars.length<=100))?this.state.arrBars:this.boundsNotMet()}
                    </div>
                    <div className={"input-space"}>
                        <div className="output-log">
                            <div>
                                <Typography className={this.inputAreaAlgorithmName.toString()}>{this.state.sortType}</Typography>
                            </div>
                            <div>
                                <textarea type="string" readOnly={true} className={"algorithm-log"} resize="none" value={this.state.text}/>
                            </div>
                        </div>
                        <AppBar  position="sticky">
                            <BottomNavigation id="BottomNavigation" style={this.BottomNavigationStyle} showLabels>
                                <BottomNavigationAction style={this.inputAreaButtonStyle} label="Play" onClick={()=>this.activateAnimator(0)} icon={<Play/>} />
                                <BottomNavigationAction style={this.inputAreaButtonStyle} label="Pause" onClick={()=>this.activateAnimator(1)} icon={<Pause/>} />
                                <BottomNavigationAction style={this.inputAreaButtonStyle} label="Reverse" onClick={()=>this.activateAnimator(2)} icon={<Reverse/>}/>
                                <BottomNavigationAction style={this.inputAreaButtonStyle} label="Restart" onClick={()=>this.activateAnimator(3)} icon={<Restart/>}/>
                                <BottomNavigationAction id={this.state.sortType+"Info"} style={this.inputAreaButtonStyle} label="Info"
                                                        onMouseEnter={() => { ReactTooltip.show(this.timeComp) }}
                                                        onMouseLeave={() => { ReactTooltip.hide(this.timeComp) }}
                                                        icon ={<Info/>}/>
                                <p ref={ref => this.timeComp = ref} data-text-color={'#3DC3F9'} data-place={'right'}
                                   data-multiline={true} data-tip={this.timeComplexity(this.state.sortType)}
                                data-border={true} data-border-color={'#3DC3F9'}></p>
                                <ReactTooltip />
                            </BottomNavigation>
                        </AppBar>
                        <br/>
                    </div>
                </div>
            </div>
        );
    }

}
export default ChartArea;
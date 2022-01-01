import React from "react";
import ChartArea from "./ChartArea";
import Bar from "./Bar";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CachedOutlinedIcon from '@material-ui/icons/CachedOutlined';
import Grid from "@material-ui/core/Grid";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';


import Slider from "../../node_modules/@material-ui/core/Slider"
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import grey from "@material-ui/core/colors/grey";

class InputArea extends React.Component {
    // represents the array that contains all the charts, and the information that goes to these charts
    constructor(props) {
        super(props);
        this.state = {
            arr: this.randomArray(),
            barArr: [],
            // the below is just a default, and should change dependent on what algos should be shown
            dictOfAlgos: {
                selectionSort: true,
                bubbleSort: true,
                insertionSort: true,
                mergeSort: true,
                quickSort: true,
                heapSort: true,
                bucketSort: true,
                shellSort: true,
                radixSort: true,
            },
            // default starting at position zero of charts
            numCharts: 0,
            arrOfCharts: [],
            tickRate: 500,
            displayBarHeight: false,
            noVisibleCharts: false,
        };
        this.createCharts = this.createCharts.bind(this);
        this.valuesOfCharts = this.valuesOfCharts.bind(this);
        this.setChartState = this.setChartState.bind(this);
        this.playAllAnimations = this.playAllAnimations.bind(this);
        this.resetAllAnimations = this.resetAllAnimations.bind(this);
        this.randomArray = this.randomArray.bind(this);
        this.setGlobalTick = this.setGlobalTick.bind(this)

        this.refreshTextField = this.refreshTextField.bind(this);
        this.toggleDisplayBarHeight = this.toggleDisplayBarHeight.bind(this);
        this.checkForNoVisibleCharts = this.checkForNoVisibleCharts.bind(this);

    }

    componentDidMount() {
        this.createCharts()
    }

    // default min value for the array
    minArrVal = 1;
    // default max value for the array
    maxArrVal = 99;

    algos = ["selectionSort", "bubbleSort", "insertionSort", "mergeSort", "quickSort",
        "heapSort", "bucketSort", "shellSort", "radixSort" ];
    // generate an object which represents all the information of a chartarea
    // this should only be called when the inputArea component is rendered
    createCharts() {
        let charts = [];
        for (const [key, value] of Object.entries(this.state.dictOfAlgos)) {
            //if the algorithm is marked `true`, show it!
            this.setState({numCharts: this.state.numCharts + 1});
            charts.push(<ChartArea key={key}
                                   arr={this.state.arr}
                                   show={value}
                                   sortedArr={[]}
                                   ref={React.createRef()}
                                   finished={[]}
                                   displayBarHeight={this.state.displayBarHeight}
                                   barArr={this.allBars(this.state.arr)}
                                   sortType={key}//SortType tells each chart what sort to use
                                   />)

        }
        this.setState({barArr: this.allBars(this.state.arr)})
        this.setState({arrOfCharts: charts});
    }

    /**
     * @param newBars: arr of bar objects
     * @param newArr: arr of numbers
     * @param showOnOff: boolean or -1 : show or hide specific chartArea
     * @param query: update only one specific chart, arrOfCharts.key === query
     * @param tick: the milliseconds for each animation
     */
    updateCharts(newBars, newArr, showOnOff, query) {
        //console.log("tick rate: " + this.state.tickRate)
        if (showOnOff === -1) {
            for (const [key, value] of Object.entries(this.state.dictOfAlgos)) {
                for (let i = 0; i < this.state.arrOfCharts.length; i++) {
                    const newChartState = {
                        barArr: newBars,
                        show: value,
                        arr: newArr,
                        displayBarHeight: this.state.displayBarHeight,
                        tickRate: this.state.tickRate
                    };
                    if (key === this.state.arrOfCharts[i].key) {
                        this.state.arrOfCharts[i].ref.current.updateChart(newChartState);
                    }
                }
            }
        } else {
            const newChartState = {
                barArr: newBars,
                show: showOnOff,
                displayBarHeight: this.state.displayBarHeight,
                arr: newArr,
                tickRate: this.state.tickRate
            };
            // finds element where it's key matches the inputted algorithm; the key is the charts identifier
            let result = this.state.arrOfCharts.find((obj) => {
                return obj.key === query
            });
            result.ref.current.updateChart(newChartState);
        }

        this.checkForNoVisibleCharts();

    }

    checkForNoVisibleCharts()
    {
        let tempVal = 0;
        for (const [key, value] of Object.entries(this.state.dictOfAlgos)) {
            tempVal += value;
        }
        if(tempVal === 0) {
            this.setState({noVisibleCharts:true});
        }
        else {
            this.setState({noVisibleCharts:false});
        }
    }

    //checks that at least one chart is showing
    //returns true if one is showing
    // oneShowing() {
    //     let tempVal = 0;
    //     for (const [key, value] of Object.entries(this.state.dictOfAlgos)) {
    //         tempVal += value;
    //     }
    //     if (tempVal === 1) {
    //        // alert("You must have at least one chart on the page")
    //         console.log("HEY");
    //     }
    //     return (tempVal === 1);
    // }

    //filter anything but numbers and commas
    filterKeypress = e => {
        if ((!['1','2','3','4','5','6','7','8','9','0',','].includes(e.key))) {
            e.preventDefault()
        }
    }

    // removes all invalid input with regex
    removeWrongInput(stream) {
        let tempArr = stream.split(/[,A-Za-z\s-=+[\]{}()*&^%$#@!`~';\\":/.|<>?]+/);
        let tempArr2 = [];
        for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i] === "" || tempArr[i] === " ") {

            } else {
                tempArr2.push(tempArr[i])
            }
        }
        return tempArr2;
    }

    // converts all string ints to literal ints
    getInts(commArr) {
        let tempArrAgain = []
        for (let i = 0; i < commArr.length; i++) {
            if (!isNaN(parseInt(commArr[i]))) {
                if (parseInt(commArr[i]) >= this.minArrVal &&
                    parseInt(commArr[i]) <= this.maxArrVal) {
                    tempArrAgain.push(Number(commArr[i]))
                }
            }
        }
        return tempArrAgain;
    }

    // handles the input of keys
    valuesOfCharts = e => {
        let textStream = e.target.value;
        // remove all spaces or erroneus strokes from the input
        let tempArr = this.removeWrongInput(textStream);
        // get all ints from the input
        let numArr = this.getInts(tempArr)
        numArr = numArr.filter((item) => {
            return (item >= 1 && item <= 99)
        });
        let barArra = this.allBars(numArr);
        this.setState({arr: numArr, barArr: barArra},
            () => this.updateCharts(this.state.barArr, this.state.arr, -1, "doesn't matter"));
        //delete any input that's too large or small
        if (numArr.length > 2 && textStream.charAt(textStream.length - 1) !== ',') {
            e.target.value = numArr.join();
        }

    };

    // //call defaultSortArr for all charts
    // defaultSortCharts() {
    //     this.state.arrOfCharts.forEach(obj => {
    //         obj.ref.current.defaultSortArr(this.state.arr);
    //         //this.updateCharts(obj.ref.current.state.arr, obj.ref.current.state.barArr, obj.ref.current.state.show, obj.key)
    //     })
    //
    // }

    // render all bars
    allBars(arrNums) {
        let barArra = [];
        for (let i = 0; i < arrNums.length; i++) {
            barArra.push(<Bar barHeight={arrNums[i]}
                              margin={1}
                              onePixel={this.maxArrVal / Math.max(...arrNums)}
                              ref={React.createRef()}
                              key={i}
                              displayBarHeight = {this.state.displayBarHeight}
                              barIndex={i}/>);
        }
        this.setState({barArr: barArra})
        return barArra;
    }

    // set the target's chart area to
    setChartState = e => {
        //console.log(e.target.textContent)
        let showAndAlgo = [-1, "invalid"];
        switch (e.target.textContent) {
            case "Selection Sort":
                let tempAlgosArr1 = this.state.dictOfAlgos;
                tempAlgosArr1.selectionSort = !tempAlgosArr1.selectionSort;
                showAndAlgo[0] = tempAlgosArr1.selectionSort;
                showAndAlgo[1] = this.algos[0];
                this.setState({dictOfAlgos: tempAlgosArr1});
                break;
            case "Bubble Sort":
                let tempAlgosArr2 = this.state.dictOfAlgos;
                tempAlgosArr2.bubbleSort = !tempAlgosArr2.bubbleSort;
                showAndAlgo[0] = tempAlgosArr2.bubbleSort;
                showAndAlgo[1] = this.algos[1];
                this.setState({dictOfAlgos: tempAlgosArr2});
                break;
            case "Insertion Sort":
                let tempAlgosArr3 = this.state.dictOfAlgos;
                tempAlgosArr3.insertionSort = !tempAlgosArr3.insertionSort;
                showAndAlgo[0] = tempAlgosArr3.insertionSort;
                showAndAlgo[1] = this.algos[2];
                this.setState({dictOfAlgos: tempAlgosArr3});
                break;
            case "Merge Sort":
                let tempAlgosArr4 = this.state.dictOfAlgos;
                tempAlgosArr4.mergeSort =  !tempAlgosArr4.mergeSort;
                showAndAlgo[0] = tempAlgosArr4.mergeSort;
                showAndAlgo[1] = this.algos[3];
                this.setState({dictOfAlgos: tempAlgosArr4});
                break;
            case "Quick Sort":
                let tempAlgosArr5 = this.state.dictOfAlgos;
                tempAlgosArr5.quickSort =  !tempAlgosArr5.quickSort;
                showAndAlgo[0] = tempAlgosArr5.quickSort;
                showAndAlgo[1] = this.algos[4];
                this.setState({dictOfAlgos: tempAlgosArr5});
                break;
            case "Heap Sort":
                let tempAlgosArr6 = this.state.dictOfAlgos;
                tempAlgosArr6.heapSort = !tempAlgosArr6.heapSort;
                showAndAlgo[0] = tempAlgosArr6.heapSort;
                showAndAlgo[1] = this.algos[5];
                this.setState({dictOfAlgos: tempAlgosArr6});
                break;
            case "Bucket Sort":
                let tempAlgosArr7 = this.state.dictOfAlgos;
                tempAlgosArr7.bucketSort = !tempAlgosArr7.bucketSort;
                showAndAlgo[0] = tempAlgosArr7.bucketSort;
                showAndAlgo[1] = this.algos[6];
                this.setState({dictOfAlgos: tempAlgosArr7});
                break;
            case "Shell Sort":
                let tempAlgosArr8 = this.state.dictOfAlgos;
                tempAlgosArr8.shellSort =  !tempAlgosArr8.shellSort;
                showAndAlgo[0] = tempAlgosArr8.shellSort;
                showAndAlgo[1] = this.algos[7];
                this.setState({dictOfAlgos: tempAlgosArr8});
                break;
            default: //"Radix Sort"
                let tempAlgosArr9 = this.state.dictOfAlgos;
                tempAlgosArr9.radixSort =!tempAlgosArr9.radixSort;
                showAndAlgo[0] = tempAlgosArr9.radixSort;
                showAndAlgo[1] = this.algos[8];
                this.setState({dictOfAlgos: tempAlgosArr9});
                break;
        }
        this.updateCharts(this.state.barArr, this.state.arr, showAndAlgo[0], showAndAlgo[1])
    };

    playAllAnimations() {

        let charts = this.state.arrOfCharts;

        for (let i = 0; i < charts.length; i++) {
            if (charts[i].ref.current.state.animator !== null) {
                charts[i].ref.current.state.animator.restartAndPlay();
            }
        }
    }

    resetAllAnimations () {
        let charts = this.state.arrOfCharts;


        for (let i = 0; i < charts.length; i++) {
            if (charts[i].ref.current.state.animator !== null) {
                charts[i].ref.current.state.animator.restartAndPause();
            }
        }
    }
    randomArray() {
        let tmpArr = Array.from({length: 15}, () => (Math.floor(Math.random() * (this.maxArrVal)) + this.minArrVal));
        return tmpArr;
    }


    /**
     * @param event the event
     * @param value the value
     */
    setGlobalTick(event) {
        this.setState({tickRate: parseInt(event.target.value)}, ()=>{
            this.updateCharts(this.state.barArr, this.state.arr, -1, "doesn't matter")
        })
        //this.updateCharts(this.state.barArr, this.state.arr, -1, "doesn't matter")

    }

    // randomizes array, updating the charts
    refreshTextField() {
        let randArr = this.randomArray();
        this.setState({arr: randArr},
            () => this.updateCharts(this.state.barArr, this.state.arr, -1, "doesn't matter"));
        return;
    }

    refreshButtonWhenSmall() {
        return (
            <Button id={"refresh-small"} onClick={this.refreshTextField}>
                <CachedOutlinedIcon/>
            </Button>
        )
    }
    refreshButtonWhenBig() {
        return (
            <Button id={"refresh-big"} onClick={this.refreshTextField}>
                <CachedOutlinedIcon/>
            </Button>
        )
    }



    // Switches the number display to show or not show
    toggleDisplayBarHeight()
    {
        this.setState({displayBarHeight: !this.state.displayBarHeight},()=> this.updateChartDisplayBarHeight());
    }

    // Tell all charts to toggle bar height display
    updateChartDisplayBarHeight(){
        let charts = this.state.arrOfCharts;
        for(let i=0; i < charts.length;i++)
        {
            charts[i].ref.current.toggleDisplayBarHeight(this.state.displayBarHeight);
        }
    }
    render() {

        // const charts = this.state.arrOfCharts.map(chart => {
        //     return (
        //         <div className='algorithm-column'>
        //             {chart}
        //         </div>
        //     )
        // })

        const NavBarStyle = {
            background: '#252423',
            paddingBottom: 10,
            paddingTop: 30
        };
        const classes = this.props.style?this.props.style: "white";
        return (
            <div id="frame">
                <div className={"control-panel"}>
                    <AppBar position="static" style={NavBarStyle}>
                        <Toolbar className={"global-controls"}>
                            <Grid container item xs={12} spacing={0} direction="row" justify="center">
                                <Button id={"play-all-bt"}
                                        color="inherit"
                                        className={this.props.style.playAllStyle}
                                        variant="outlined"
                                        onClick={this.playAllAnimations}>
                                    Play All
                                </Button>
                                <Button id={"reset-all-bt"}
                                        color="inherit"
                                        className={this.props.style.resetAllStyle}
                                        variant="outlined"
                                        onClick={this.resetAllAnimations}>
                                    Reset All
                                </Button>
                                <Button id={"barValToggle"}
                                        color="inherit"
                                        className={this.props.style.toggleValuesStyle}
                                        variant="outlined"
                                        onClick={this.toggleDisplayBarHeight}>
                                    Toggle Values
                                </Button>
                            </Grid>
                        </Toolbar>
                        <Toolbar className={"global-controls"}>
                                <Grid container item xs={12} spacing={0} direction="row" justify="center">
                                    <Tooltip title={this.state.dictOfAlgos.selectionSort?"Remove from Page":"Add to Page"}>
                                        <Button color={this.state.dictOfAlgos.selectionSort?"inherit":"disabled"}
                                                className={this.props.style.algorithmOptionsStyle}
                                                variant="outlined" onClick={this.setChartState}>
                                            Selection Sort
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={this.state.dictOfAlgos.bubbleSort?"Remove from Page":"Add to Page"}>
                                        <Button color={this.state.dictOfAlgos.bubbleSort?"inherit":"disabled"}
                                                className={this.props.style.algorithmOptionsStyle}
                                                variant="outlined" onClick={this.setChartState}>
                                            Bubble Sort
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={this.state.dictOfAlgos.insertionSort?"Remove from Page":"Add to Page"}>
                                        <Button color={this.state.dictOfAlgos.insertionSort?"inherit":"disabled"}
                                                className={this.props.style.algorithmOptionsStyle}
                                                variant="outlined" onClick={this.setChartState}>
                                            Insertion Sort
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={this.state.dictOfAlgos.mergeSort?"Remove from Page":"Add to Page"}>
                                        <Button color={this.state.dictOfAlgos.mergeSort?"inherit":"disabled"}
                                                className={this.props.style.algorithmOptionsStyle}
                                                variant="outlined" onClick={this.setChartState}>
                                            Merge Sort
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={this.state.dictOfAlgos.quickSort?"Remove from Page":"Add to Page"}>
                                        <Button color={this.state.dictOfAlgos.quickSort?"inherit":"disabled"}
                                                className={this.props.style.algorithmOptionsStyle}
                                                variant="outlined" onClick={this.setChartState}>
                                            Quick Sort
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={this.state.dictOfAlgos.heapSort?"Remove from Page":"Add to Page"}>
                                        <Button color={this.state.dictOfAlgos.heapSort?"inherit":"disabled"}
                                                className={this.props.style.algorithmOptionsStyle}
                                                variant="outlined" onClick={this.setChartState}>
                                            Heap Sort
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={this.state.dictOfAlgos.bucketSort?"Remove from Page":"Add to Page"}>
                                        <Button color={this.state.dictOfAlgos.bucketSort?"inherit":"disabled"}
                                                className={this.props.style.algorithmOptionsStyle}
                                                variant="outlined" onClick={this.setChartState}>
                                            Bucket Sort
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title={this.state.dictOfAlgos.shellSort?"Remove from Page":"Add to Page"}>
                                    <Button color={this.state.dictOfAlgos.shellSort?"inherit":"disabled"}
                                            className={this.props.style.algorithmOptionsStyle}
                                            variant="outlined" onClick={this.setChartState}>
                                        Shell Sort
                                    </Button>
                                    </Tooltip>
                                    <Tooltip title={this.state.dictOfAlgos.radixSort?"Remove from Page":"Add to Page"}>
                                        <Button color={this.state.dictOfAlgos.radixSort?"inherit":"disabled"}
                                                className={this.props.style.algorithmOptionsStyle}
                                                variant="outlined" onClick={this.setChartState}>
                                            Radix Sort
                                        </Button>
                                    </Tooltip>
                                </Grid>
                        </Toolbar>
                        <Toolbar id={"nums-toolbar"}>
                            <Typography id="input-text" className={this.props.style.inputNumberTypographyStyle}>
                                Input Numbers:
                            </Typography>
                            <TextField
                                id="input-numbers-to-sort"
                                placeholder={this.state.arr.toString()}
                                variant="outlined"
                                onChange={this.valuesOfCharts}
                                onKeyPress={this.filterKeypress}
                                InputProps={{
                                    className: this.props.style.textFieldStyle,
                                }}
                            />

                            <Tooltip id={"refresh-when-big"} title={"Generate Random Values"}>
                                {this.refreshButtonWhenBig()}
                            </Tooltip>
                        </Toolbar>
                        <Toolbar id={"little-nums-toolbar"}>
                            <Tooltip id={"refresh-when-lil"} title={"Generate Random Values"}>
                                {this.refreshButtonWhenSmall()}
                            </Tooltip>
                        </Toolbar>
                        <div style={{margin: 'auto', color:'#F6F4F2'}}>
                            <Toolbar style={{padding: '10px', margin: '10px'}}>
                                <Typography className={this.props.style.inputNumberTypographyStyle}>
                                    Animation Speed:
                                </Typography>
                                <FormControl variant="filled" color={"default"}>
                                    <Select variant='outlined'
                                            style={{width: '150px', color: "inherit", borderRadius:'5px', marginLeft:'2px'}}
                                            classes={{
                                                icon: classes.icon
                                            }}
                                            labelId="speed-label"
                                            id="select-speed"
                                            onChange={this.setGlobalTick} value={this.state.tickRate} >
                                        <MenuItem value={500}>Default</MenuItem>
                                        <MenuItem value={1000}>Very slow</MenuItem>
                                        <MenuItem value={750}>Slow</MenuItem>
                                        <MenuItem value={250}>Fast</MenuItem>
                                        <MenuItem value={100}>Very fast</MenuItem>
                                    </Select>
                                </FormControl>
                            </Toolbar>
                        </div>
                    </AppBar>
                </div>
                <div className={"chart-area"}>
                    { this.state.noVisibleCharts &&
                        <div className={this.props.style.noVisibleChartsStyle}>
                             <h3 id={"no-charts-visible-hdr"}>Please click on a sorting algorithm above</h3>
                        </div>
                    }


                    {this.state.arrOfCharts.map(chart => {
                        return (

                            chart

                        )
                    })}
                </div>
                <div><br/></div>


            </div>

        )
    }
}



export default InputArea;
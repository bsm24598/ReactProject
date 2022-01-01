import '../index.css'
import anime from "animejs";


export class Animator {

    constructor(arrBars,sortType,change, tickRate) {
        this.arrBars = arrBars; //Array of bar components
        this.arrBarRefs = []; // Array of bar div references
        this.sortType = sortType;
        if (tickRate) {
            this.aniSpeed = tickRate;
        } else {
            this.aniSpeed = 500;
        }
        this.changeLogText = change;
        this.zIndex =0;
        this.mergeColors = ['#e6194b', '#3cb44b', '#8BF992', '#B9FFB9', '#00FFFF', '#6699CC', '#9966B2', '#CC3399', '#FF004E', '#09EBEE', '#8BF992', '#FF007F', '#09EBEE', '#FB89FB', '#BC43B7', '#CA68C7',  '#D88DD5', '#E6B2E4', '#F3D8F2' ];

        this.colors = [ '#3DC3F9','#FFFFFF','#A4FF4F', '#3CFFEC', '#A4FF4F'];

        this.timeline = anime.timeline({
            easing: 'easeInOutExpo',
            duration: this.aniSpeed,
            autoplay: false,

        })

        this.bucketColors = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8']

        if(this.arrBars[0].ref.current !== null) { // Ensure that the bar is being rendered to avoid any null errors
            for (let i = 0; i < this.arrBars.length; i++) {
                this.arrBarRefs.push(this.arrBars[i].ref.current.divRef.current); // Get reference to bar div..
            }

            this.barDis = this.arrBarRefs[0].getBoundingClientRect().x - this.arrBarRefs[1].getBoundingClientRect().x; // Gets distance between two bars


            this.arr = [];

            for(let i=0; i < arrBars.length;i++)
            {
                this.arr.push(parseInt(arrBars[i].ref.current.state.barHeight));
            }

            this.generateTimeline();

        }
    }

    generateTimeline() {
        switch (this.sortType) {
            case "selectionSort":
                this.createSelectionSortTimeline()
                break;
            case "bubbleSort":
                this.createBubbleSortTimeline();
                break;
            case "insertionSort":
                this.createInsertionSortTimeline();
                break;
            case "mergeSort":
                this.createMergeSortTimeline();
                break;
            case "quickSort":
                this.createQuickSortTimeline();
                break;
            case "heapSort":
                this.createHeapSortTimeline();
                break;
            case "bucketSort":
                this.createBucketSortTimeline();
                break;
            case "shellSort":
                this.createShellSortTimeline();
                break;
            case "radixSort":
                this.createRadixSortTimeline();
                break;

            default:
                break;
        }
    }

    createBubbleSortTimeline() {

        let inputArr = [];

        for(let i =0; i < this.arr.length;i++)
        {
            inputArr.push(this.arr[i]);
        }

        let len = inputArr.length;

        let swapped = false;

        this.addPreSortAnimation(this);

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                this.compare(this.arrBarRefs[j],this.arrBarRefs[j+1],this,inputArr[j],inputArr[j+1])
                if (inputArr[j] > inputArr[j + 1]) { //swap
                    let tmp = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tmp;
                    this.swapRefs(j,j+1);
                    this.swap(this.arrBarRefs[j], this.arrBarRefs[j+1],j,j+1, this,inputArr[j],inputArr[j+1]);
                    swapped = true;
                }
            }
            if(!swapped)
                break;
            else
                swapped = false;
        }

        this.addPostSortAnimation(this);

    }


    createSelectionSortTimeline() {

        let inputArr = [];

        for(let i =0; i < this.arr.length;i++)
        {
            inputArr.push(this.arr[i]);
        }

        let len = inputArr.length;

        this.addPreSortAnimation(this);

        for (let i = 0; i < len; i++) {
            let min = i;

            for (let j = i + 1; j < len; j++) {
                this.compare(this.arrBarRefs[min],this.arrBarRefs[j],this,inputArr[min],inputArr[j]);
                if (inputArr[min] > inputArr[j]) {
                    min = j;
                }
            }

            if (min !== i) {
                this.swapRefs(i,min);
                this.swap(this.arrBarRefs[i],this.arrBarRefs[min],i,min,this,inputArr[i],inputArr[min]);

                let tmp = inputArr[i];
                inputArr[i] = inputArr[min];
                inputArr[min] = tmp;
            }
        }

        this.addPostSortAnimation(this);

    }

    createBucketSortTimeline() {
        let inputArr = [];

        let bucket1 = []
        let bucket2 = []
        let bucket3 = []
        let bucket4 = []

        let b1numbers = []
        let b2numbers = []
        let b3numbers = []
        let b4numbers = []

        this.addPreSortAnimation(this)

        // for (let i=0; i < this.arr.length; i++) {
        //     this.timeline.add({
        //         targets: this.arrBarRefs[i],
        //         translateY: -25
        //     })
        // }

        this.timeline.add({
            targets: this.arrBarRefs,
            translateY: '+=' + -20
        })

        for (let i=0; i < this.arr.length; i++) {
            inputArr.push(this.arr[i]);
            if (this.arr[i] <= 25) {
                bucket1.push(this.arrBarRefs[i])
                b1numbers.push(this.arr[i])
            }
            else if (this.arr[i] <= 50) {
                bucket2.push(this.arrBarRefs[i])
                b2numbers.push(this.arr[i])
            }
            else if (this.arr[i] <= 75) {
                bucket3.push(this.arrBarRefs[i])
                b3numbers.push(this.arr[i])
            }
            else {
                bucket4.push(this.arrBarRefs[i])
                b4numbers.push(this.arr[i])
            }
        }

        let b1 = 0;
        let b2 = (bucket1.length) * -1;
        let b3 = (bucket1.length + bucket2.length) * -1;
        let b4 = (bucket1.length + bucket2.length + bucket3.length) * -1;

        for (let i=0; i < this.arr.length; i++) {
            if (this.arr[i] <= 25) {
                let movex = (b1 + i) * this.barDis;
                this.placeBucket(this.arrBarRefs[i],movex, 20, this.bucketColors[0], this.arr[i], 1, this)
                b1--;

            }
            else if (this.arr[i] <= 50) {
                let movex = (b2 + i) * this.barDis;
                this.placeBucket(this.arrBarRefs[i], movex, 20, this.bucketColors[1], this.arr[i], 2, this)
                b2--;
            }
            else if (this.arr[i] <= 75) {
                let movex = (b3 + i) * this.barDis;
                this.placeBucket(this.arrBarRefs[i], movex, 20, this.bucketColors[2], this.arr[i], 3, this)
                b3--;
            }
            else {
                let movex = (b4 + i) * this.barDis;
                this.placeBucket(this.arrBarRefs[i], movex, 20, this.bucketColors[3], this.arr[i], 4, this)
                b4--;
            }
        }

        this.bucketBubbleSort(bucket1, b1numbers);
        this.bucketBubbleSort(bucket2, b2numbers);
        this.bucketBubbleSort(bucket3, b3numbers);
        this.bucketBubbleSort(bucket4, b4numbers);


        this.addPostSortAnimation(this);
    }

    placeBucket(bar, moveX, moveY, color, value, bucketNum, t) {

        function updateLog() {
            t.changeLogText('Placing ' + value + ' in bucket ' + bucketNum);
        }

        this.timeline.add({
            targets: bar,
            translateY: '+=' + moveY,
            translateX: moveX,
            backgroundColor: color,
            changeBegin: function () {
                updateLog();
            }
        })
    }


    bucketBubbleSort(bucketRefs, inputArr){

        let len = inputArr.length;

        let swapped = false;

        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - 1; j++) {
                this.compare(bucketRefs[j],bucketRefs[j+1],this,inputArr[j],inputArr[j+1])
                if (inputArr[j] > inputArr[j + 1]) { //swap
                    let tmp = inputArr[j];
                    inputArr[j] = inputArr[j + 1];
                    inputArr[j + 1] = tmp;


                    //console.log(inputArr);
                    console.log('swap: ' + inputArr[j] + ' and ' + inputArr[j+1])
                    this.bucketSwap(bucketRefs[j], bucketRefs[j+1], inputArr[j],inputArr[j+1], this);
                    let temp = bucketRefs[j]
                    bucketRefs[j] = bucketRefs[j+1];
                    bucketRefs[j+1] = temp;


                    swapped = true;
                }
            }
            if(!swapped)
                break;
            else
                swapped = false;
        }
    }

    bucketSwap(t1, t2, value1, value2, t) {
        let dis = this.barDis;

        function updateLog()
        {
            t.changeLogText("Swapping: " + value1 + " with " + value2);
        }

        this.timeline.add({
            targets: [t1,t2],
            translateX: function (e,i,l)
            {
                if(i===0)
                    return '-=' + dis.toString()

                return '+=' + dis.toString()
            },
            changeBegin: function() {
                updateLog();
            }
        });
    }






    createInsertionSortTimeline(){
        let inputArr = [];

        for(let i =0; i < this.arr.length;i++)
        {
            inputArr.push(this.arr[i]);
        }

        this.addPreSortAnimation(this);

        for (let i = 1; i < inputArr.length; i++) {
            let j = i - 1;
            let temp = inputArr[i];
            this.compare(this.arrBarRefs[j],this.arrBarRefs[i],this,inputArr[j],inputArr[i]);
            while (j >= 0 && inputArr[j] > temp) {
                if(j+1 !== i) {
                    this.compare(this.arrBarRefs[j], this.arrBarRefs[j + 1],this,inputArr[j],inputArr[j+1]);
                }
                this.swapRefs(j,j+1);
                this.swap(this.arrBarRefs[j], this.arrBarRefs[j+1], j,j+1, this, inputArr[j], inputArr[j+1]);
                inputArr[j + 1] = inputArr[j];
                j--;
            }
            inputArr[j+1] = temp;
        }

        this.addPostSortAnimation(this);

    }

    /**
     * QUICK SORT
     **********************************************************************************************************
     */

    createQuickSortTimeline(){
        let inputArr = [];

        for(let i =0; i < this.arr.length;i++)
        {
            inputArr.push([this.arr[i],i,this.arrBarRefs[i]]);
        }
        this.addPreSortAnimation(this);
        let LeftMostX = inputArr[0][2].getBoundingClientRect().x
        this.quickSort(inputArr,LeftMostX)
        this.addPostSortAnimation(this);
    }
    // quicksort function from : https://www.w3resource.com/javascript-exercises/searching-and-sorting-algorithm/searching-and-sorting-algorithm-exercise-1.php
    /**
     * quickSort() performs the visual quicksort on the input array
     * @param origArray: passed-in array with values, indexes, and references
     * @param lmx: Left Most X
     * @returns {*[]|*} array with numbers less than the pivot on the left, pivot between those values and the right
     */
    quickSort(origArray, lmx) {
        if (origArray.length <= 1) {
            return origArray;
        }
        else {
            //0 value, 1 index, 2 reference
            let newArray = [];
            let pivot = origArray.pop();
            let length = origArray.length;

            let left = [];
            let right = [];
            let rightToRepos = []
            for(let i =0; i < length; i++) {
                this.compare(origArray[i][2],pivot[2],this,origArray[i][0],pivot[0]);
                if (origArray[i][0] <= pivot[0]) {
                    this.colorLeft(this,origArray[i][2], origArray[i][0]);
                    left.push([origArray[i][0], i,origArray[i][2]]);

                } else {
                    rightToRepos[rightToRepos.length] = origArray[i];
                    this.colorRight(this,origArray[i][2], origArray[i][0]);
                    right.push([origArray[i][0],i,origArray[i][2]]);
                }
            }

            let leftBarRefs = [];
            for(let j = 0; j < left.length; j++){
                leftBarRefs[j] = left[j][2];
            }
            let rightBarRefs = [];
            for(let k = 0; k < right.length; k++){
                rightBarRefs[k] = right[k][2]
            }
            //left and right left most x as a function of finding the positions after placing left & right bars & pivot
            let leftAndRightLmx = this.moveBarsQS(leftBarRefs, pivot[2], rightBarRefs, lmx, this, left, pivot, right)
            return newArray.concat( this.quickSort(left, leftAndRightLmx[0]), pivot, this.quickSort(right, leftAndRightLmx[1]));
        }
    }


    /**
     * moveBarsQS: move bars to their locations to reflect next part of sort
     * @param lR: leftBarRefs
     * @param pR: pivotRef
     * @param rR: righBarRefs
     * @param lmx: leftMostXPosition
     * @param t: textbox
     * @param l: left array
     * @param p: pivot
     * @param r: right array
     * @returns: {[]}: Left and Right left most x's
     */
    moveBarsQS(lR, pR, rR, lmx, t, l, p, r) {
        let dis = this.barDis
        function updateLog(){
            t.changeLogText("Rearranging bars");
        }
        let LeftAndRightLMX = [];
        this.timeline.add({
            targets: [lR, pR, rR],
            translateX:[{value: function(el,i){
                    let currX = el.getBoundingClientRect().x;
                    // distance between left-most.x and current el.x, space by distance * index
                    let disToMove = 0 - (Math.abs(lmx - currX)) - (dis*i)
                    if(i===0){
                        LeftAndRightLMX[0] = disToMove + currX;
                    }
                    if(i===lR.length+1){
                        LeftAndRightLMX[1] = disToMove + currX;
                    }
                    return '+=' + disToMove
                },
            }],

            changeBegin: function () {
                updateLog();
            },
        }).add({
            targets: [lR, pR, rR],
            backgroundColor: [
                {
                    value: this.colors[0],
                }],
        })

        return LeftAndRightLMX;
    }

    colorLeft(t, ref, val){
        function updateLog()
        {
            t.changeLogText(val + " will be left of pivot");
        }

        this.timeline.add({
            targets: ref,
            backgroundColor: [
                {
                    value: this.colors[3],
                }
            ],
            changeBegin: function() {
                updateLog();
            }
        });
    }

    colorRight(t, ref, val){
        function updateLog()
        {
            t.changeLogText(val + " will be right of pivot");
        }

        this.timeline.add({
            targets: ref,
            backgroundColor: [
                {
                    value: this.colors[4],
                    // easing: 'steps(1)',
                }
            ],
            // translateY: [
            //     {
            //         value: '-=8',
            //     }
            // ],
            changeBegin: function() {
                updateLog();
            }
        });
    }


    /**
     * HEAP SORT
     **********************************************************************************************************
     */


    createHeapSortTimeline(){
        let refs = [];

        for(let i =0; i < this.arr.length;i++) {
            refs.push(this.arrBarRefs[i]);
            refs[i].id =  i;
        }

        this.addPreSortAnimation(this);

        this.heap_sort(refs);

        this.addPostSortAnimation(this);
    }


    heap_sort(arr) {
        this.put_array_in_heap_order(arr);
        let end = arr.length - 1;
        while(end > 0) {
            this.swapAnimate(arr, 0, end);
            this.sift_element_down_heap(arr, 0, end);
            end -= 1
        }
    }

    put_array_in_heap_order(arr) {
        let i;
        i = arr.length / 2 - 1;
        i = Math.floor(i);
        while (i >= 0) {
            this.sift_element_down_heap(arr, i, arr.length);
            i -= 1;
        }
    }

    sift_element_down_heap(heap, i, max) {
        let i_big, c1, c2;
        while(i < max) {
            i_big = i;
            c1 = 2*i + 1;
            c2 = c1 + 1;
            if (c1 < max && this.getBarHeight(heap[c1]) > this.getBarHeight(heap[i_big])) {
                this.compare(heap[c1],heap[i_big],this,heap[c1].innerText,heap[i_big].innerText);
                i_big = c1;
            }
            if (c2 < max && this.getBarHeight(heap[c2]) > this.getBarHeight(heap[i_big])) {
                this.compare(heap[c2],heap[i_big],this,heap[c2].innerText,heap[i_big].innerText);
                i_big = c2;
            }

            if (i_big === i) return;
            this.swapAnimate(heap,i, i_big);
            i = i_big;
        }
    }

    /**
     * MERGE SORT
     **********************************************************************************************************
     */

    createMergeSortTimeline(){
        let refs = [];

        for(let i =0; i < this.arr.length;i++) {
            refs.push(this.arrBarRefs[i]);
            refs[i].id =  i;
        }

        this.addPreSortAnimation(this);

        this.mergeSort(refs);

        this.addPostSortAnimation(this);
    }



    mergeSort(arr){
        if(arr.length <= 1) {
            return arr;
        }

        let halfPoint = Math.ceil(arr.length / 2);

        let firstHalf = this.mergeSort(arr.splice(0, halfPoint));
        let secondHalf = this.mergeSort(arr.splice(-halfPoint));

        return this.merge(firstHalf, secondHalf);
    }

    merge(arr1, arr2){
        let result = [];
        let i = 0;
        let j = 0;

        while(i < arr1.length && j < arr2.length){
            this.compareRef(arr1[i],arr2[j],this);
            if(this.getBarHeight(arr1[i]) >this.getBarHeight(arr2[j])) {
                result.push(arr2[j]);
                j++;
            } else {
                result.push(arr1[i]);
                i++;
            }
        }

        while(i < arr1.length){
            result.push(arr1[i]);
            i++;
        }

        while(j < arr2.length){
            result.push(arr2[j]);
            j++;
        }

        let len = result.length
        let min = parseInt(result[0].id);

        for (let i = 0; i < len; i++) {
            if(parseInt(result[i].id) < min) {
                min = parseInt(result[i].id);
            }
        }

        //this.changeColor(result,this.getMergeColor());
        this.mergeMoveY(result,-20);


        for (let i = 0; i < len; i++) {
            result[i].style.zIndex = this.zIndex;
            this.zIndex++;
            let dis = result[i].id;
            this.mergeMoveTo(result[i],i+min,dis,this);
            this.mergeEnd(result[i]);
            result[i].id = i+min;
        }

        this.changeColor(result,this.getMergeColor());
        return result;
    }

    getMergeColor(){
        return this.mergeColors.pop();
    }

    mergeMoveTo(t1,i1,i2,t) {

        function updateLog()
        {
            t.changeLogText("Merging elements into original array");
        }

        let dis = this.barDis;
        dis = dis * ((i2-i1));

        this.timeline.add({
            targets: [t1],
            duration: this.aniSpeed/2,
            translateX: '+=' + dis,
            translateY: '+=' + 20,
            zIndex: this.zIndex,
            changeBegin: function() {
                updateLog();
            }
            //boxShadow: '0px 0 0px #0ff',
        });
    }

    mergeMoveY(t1,transY) {
        this.timeline.add({
            targets: [t1],
            duration: this.aniSpeed/2,
            translateY: '+=' + transY,
            //boxShadow: '2px 0 50px white',
        });
    }

    mergeEnd(t1) {
        this.timeline.add({
            targets: [t1],
            duration: this.aniSpeed/2,
            border: "0px solid #000000",
            // boxShadow: '0px 0 0px white',
        });
    }


    /**
     * SHELL SORT
     **********************************************************************************************************
     */

    createShellSortTimeline(){
        let refs = [];

        for(let i =0; i < this.arr.length;i++) {
            refs.push(this.arrBarRefs[i]);
            refs[i].id =  i;
        }

        this.addPreSortAnimation(this);

        this.shellSort(refs);

        this.addPostSortAnimation(this);
    }


    shellSort(arr) {
        let n = arr.length;
        let gap = Math.floor(n/2);
        this.onGapChange(this,arr,gap)
        while(gap>0)
        {
            for(let i=gap;i<n;i++)
            {
                let temp = parseInt(arr[i].style.height.replace("%",""));
                let j=i;
                this.compare(arr[i],arr[j-gap],this,arr[i].innerText,arr[j-gap].innerText);
                while(j>=gap && parseInt(arr[j-gap].style.height.replace("%","")) >temp)
                {
                    this.swapAnimate(arr,j,j-gap);
                    j -= gap;
                }

            }
            gap = Math.floor(gap/2);

            if(gap>0)
                this.onGapChange(this,arr,gap);
        }
    }

    updateGapColors(arr,gap) {
        let color = this.mergeColors[2];
        let count = gap;

        for(let i =0; i < arr.length;i++){
            if(i === 0)
            {
                this.changeColor(arr[i], color);
            }
            if(i === count)
            {
                this.changeColor(arr[i], color);
                count += gap;
            }
        }

    }


    onGapChange(t,arr,newGap) {
        this.updateGapColors(arr,newGap);

        function updateLog()
        {
            t.changeLogText("GAP SET AT " + newGap);
        }

        this.timeline.add({
            duration: this.aniSpeed*2,
            changeBegin: function() {
                updateLog();
            }
        });

        this.changeColor(arr,this.colors[0]);
    }


    /**
     * RADIX SORT
     **********************************************************************************************************
     */

    createRadixSortTimeline(){
        let refs = [];

        for(let i =0; i < this.arr.length;i++) {
            refs.push(this.arrBarRefs[i]);
            refs[i].id =  i;
        }

        this.addPreSortAnimation(this);

        this.radixSort(refs);

        this.addPostSortAnimation(this);
    }

    getPosition(num, place){
        return  Math.floor(Math.abs(num)/Math.pow(10,place))% 10
    }   // gives back bucket index


     getMax(arr){
        let max=0;
        for(let num of arr){
            if(max <  num.innerText.toString().length){
                max = num.innerText.toString().length
            }
        }
        return max
    }
    //https://reactgo.com/radix-sort-algorithm-javascript/
    radixSort(arr){

       this.radixShrink(arr,this);
       this.radixToStartY(arr);

        const max = this.getMax(arr);

        for(let i=0;i<max;i++){
            let buckets = Array.from({length:10},()=>[]) // creating 10 empty arrays

            for(let j=0;j<arr.length;j++){
                let index = this.getPosition(arr[j].innerText,i);
                buckets[index].push(arr[j]); //push the number into desired bucket
            }
            arr = [].concat(...buckets);


            for(let b = 0; b < buckets.length;b++)
            {
                let currentBucket = buckets[b];
                for(let bb =0; bb < currentBucket.length;bb++){
                    let ref = currentBucket[bb];
                    this.radixMoveToBucket(ref,b,ref.id,this,bb);
                    ref.id = b;
                    this.changeColor(ref,this.mergeColors[this.mergeColors.length-(b+1)]);
                }
            }



            let x=0;
            for (let b = 0; b < buckets.length; b++) {
                let currentBucket = buckets[b];
                for (let bb = 0; bb < currentBucket.length; bb++) {
                    let ref = currentBucket[bb];
                    this.radixMoveBackToArray(ref, x, ref.id, this, bb);
                    ref.id = x;
                    x++;
                }
            }

        }

        this.radixToEndY(arr);

        for(let i =0; i <arr.length;i++) {
            this.radixGrow(arr[i],this.getBarHeight(arr[i]),this);

        }


        return arr
    }


    radixShrink(t1,t) {

        function updateLog()
        {
            t.changeLogText("Shrinking bars...");
        }

        this.timeline.add({
            targets: [t1],
            height: [
                {
                    value: [1],
                },
            ],
            duration: this.aniSpeed*2,
            changeBegin: function() {
                updateLog();
            }
        });
    }

    radixGrow(t1,val,t) {

        function updateLog()
        {
            t.changeLogText("Restoring bar heights...");
        }

        this.timeline.add({
            targets: [t1],
            height: [
                {
                    value: [val],
                },
            ],
            duration: this.aniSpeed/2,
            changeBegin: function() {
                updateLog();
            }
        });
    }

    radixToStartY(t1) {
        this.timeline.add({
            targets: [t1],
            duration: this.aniSpeed*2,
            translateY: '-=' + 150,
        });
    }

    radixToEndY(t1) {
        this.timeline.add({
            targets: [t1],
            duration: this.aniSpeed*2,
            translateY: '+=' + 150,
        });
    }


    radixMoveToBucket(t1,i1,i2,t,count) {

        function updateLog()
        {
            t.changeLogText("Moving " + t1.innerText + " to bucket " + i1);
        }

        let dis = this.barDis;
        dis = dis * ((i2-i1));

        let y = 150-(count*15);

        this.timeline.add({
            targets: [t1],
            duration: this.aniSpeed*2,
            translateX: '+=' + dis,
            translateY: '+=' + y,
            changeBegin: function() {
                updateLog();
            }
        });
    }

    radixMoveBackToArray(t1,i1,i2,t,count) {

        function updateLog()
        {
            t.changeLogText("Moving " + t1.innerText + " to array");
        }

        let dis = this.barDis;
        dis = dis * ((i2-i1));

        let y = 150-(count*15);

        this.timeline.add({
            targets: [t1],
            duration: this.aniSpeed*2,
            translateX: '+=' + dis,
            translateY: '-=' + y,
            changeBegin: function() {
                updateLog();
            }
        });
    }


    /**
     * HELPERS
     **********************************************************************************************************
     */


    swapAnimate(data, i, j) {
        let tmp = data[i];
        data[i] = data[j];
        data[j] = tmp;

        this.animateBarSwap(data[j],data[i],parseInt(data[j].id),parseInt(data[i].id),this);
        let tmp1 = parseInt(data[i].id);
        data[i].id = parseInt(data[j].id);
        data[j].id = tmp1;
    }


    animateBarSwap(t1,t2,i1,i2,t) {
        let dis = this.barDis;
        dis = dis * (i2-i1);

        function updateLog()
        {
            t.changeLogText("Swapping " + t2.innerText + " with " + t1.innerText);
        }

        this.timeline.add({
            targets: [t1,t2],
            duration: this.aniSpeed*2,
            translateX: function (e,i,l)
            {
                if(i===0)
                    return '-=' + dis

                return '+=' + dis
            },
            changeBegin: function() {
                updateLog();
            }
        });
    }

    changeColor(t1,color) {
        this.timeline.add({
            targets: [t1],
            backgroundColor: [
                {
                    value: [this.colors[0],color],
                    duration: this.aniSpeed/1000,
                },
            ],
        });
    }


    getBarHeight(ref) {
        return parseInt(ref.style.height.replace("%",""));
    }


    compareRef(t1,t2,t) {

        function updateLog()
        {
            t.changeLogText("Comparing: " + t1.innerText + " with " + t2.innerText);
        }

        this.timeline.add({
            targets: [t1,t2],
            boxShadow: [
                {
                    value: '0px 0px 1px 1px white',
                    duration: this.aniSpeed*2
                },
                {
                    value: '0px 0px 0px 0px white',
                    duration: 0
                }
            ],
            changeBegin: function() {
                updateLog();
            }
        });
    }


    /**
     * Swaps barRefs
     * @param i1: left bar index
     * @param i2: right bar index
     */
    swapRefs(i1,i2) {
        // console.log(i1)
        // console.log(i2)
        let tmpDiv = this.arrBarRefs[i1];
        this.arrBarRefs[i1] = this.arrBarRefs[i2];
        this.arrBarRefs[i2] = tmpDiv;
    }

    /**
     * Swaps two bars
     * @param t1: left bar to swap
     * @param t2: right bar to swap
     * @param i1: index of t1
     * @param i2: index of t2
     * @param t: this
     * @param value1 value of the left index in array being swapped
     * @param value2 value of the left index in array being swapped
     */
    swap(t1,t2,i1,i2,t,value1,value2) {
        let dis = this.barDis;
        dis = dis * (i2-i1);

        function updateLog()
        {
            t.changeLogText("Swapping: " + t1.innerText + " with " + t2.innerText);
        }

        this.timeline.add({
            targets: [t1,t2],
            translateX: function (e,i,l)
            {
                if(i===0)
                    return '+=' + dis

                return '-=' + dis
            },
            changeBegin: function() {
                updateLog();
            }
        });
    }


    /**
     * Highlights two bars that are being compared
     * @param t1: left bar
     * @param t2: right bar
     * @param t this
     * @param value1: left value of bar
     * @param value2: right value of bar
     */
    compare(t1,t2,t,value1,value2) {

        function updateLog()
        {
            t.changeLogText("Comparing: " + t1.innerText + " with " + t2.innerText);
        }

        this.timeline.add({
            targets: [t1,t2],
            backgroundColor: [
                {
                    value: [this.colors[0],this.colors[1]],
                    duration: this.aniSpeed*2,
                },
                {
                    value: this.colors[0],
                    duration: 0,
                }
            ],
            changeBegin: function() {
                updateLog();
            }
        });
    }


    // Adds animation object to timeline to change text log to "Sorted" only applied once per algorithm after sorted
    addPostSortAnimation(t)
    {
        function updateLog()
        {
            t.changeLogText("SORTED");
        }

        this.timeline.add({
            targets: this.arrBarRefs,
            backgroundColor: [  // flash green
                {
                    value: [this.colors[0],this.colors[2]],
                    duration: this.aniSpeed*2,
                }
                // {
                //     value: this.colors[0],
                //     duration: 0,
                // }
            ],
            changeBegin: function() {
                updateLog();
            },
        });
    }

    // Adds animation object at the start of the sort
    addPreSortAnimation(t)
    {
        function updateLog()
        {
            t.changeLogText("UNSORTED");
        }

        this.timeline.add({
            changeBegin: function() {
                updateLog();
            }
        });
    }


    play() {

        if(this.timeline.progress === 0 || this.timeline.progress === 100) {

            if(this.timeline.reversed) {
                this.timeline.reverse();
            }
        }

        this.timeline.play();
    }

    pause() {
        this.timeline.pause();
    }

    reverse() {
        if(!this.timeline.paused){
            this.timeline.reverse();
        }
    }

    restart(){
        if(this.timeline.reversed) {
            this.timeline.reverse();
        }

        this.timeline.restart();
    }

    restartAndPlay()
    {
        this.restart();
        this.play();
    }

    restartAndPause()
    {
        this.restart();
        this.pause();
        this.changeLogText("UNSORTED")
    }
}
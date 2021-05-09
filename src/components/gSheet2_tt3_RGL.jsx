import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

// moving the css here did it
import "../css/styles.css";
import "../css/example-styles.css";

import ScaleText from "react-scale-text";

import GridLayout from 'react-grid-layout';
const ReactGridLayout = WidthProvider(RGL);

export default class MyFirstGrid extends React.Component {
  static defaultProps = {
    transformScale: 0.5
  };
  constructor() {
    super();
    var today = new Date();

    console.log('tdy: ', today);

    this.state = {
      dow: today.getDay()
    };
  };

  getClass(key) {
    var temp = "";
    //some code to return className
    // if (key.includes("Mon")) {
    //   temp = temp + "Mon ";
    // };
    // if (key.includes("SS")) {
    //   temp = temp + "SS ";
    // };
    // if (key.includes("Bio")) {
    //   temp = temp + "Bio ";
    // };
    // if (key.includes("EMaths")) {
    //   temp = temp + "Bio ";
    // };
    // if (key.includes("Bio")) {
    //   temp = temp + "Bio ";
    // };
    // if (key.includes("Bio")) {
    //   temp = temp + "Bio ";
    // };
    // if (key.includes("Bio")) {
    //   temp = temp + "Bio ";
    // };
    // if (key.includes("Bio")) {
    //   temp = temp + "Bio ";
    // };
    return key;
    // if ((key.length == 1) || (key[0] == '0')) {
    //   return 's1'
    // }
    // else {
    //   return '';
    // };
    // return 's1';
  };

render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 1, static: true},
      // {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
      {i: 'b', x: 0, y: 0, w: 1, h: 1, static: true},
      {i: 'd', x: 0, y: 1, w: 1, h: 2, static: true},
      {i: 'c', x: 4, y: 0, w: 1, h: 2},
      {i: 'e', x: 0, y: 0, w: 1, h: 1, static: true},
      {i: 'f', x: 0, y: 0, w: 1, h: 1, static: true},
      {i: 'g', x: 0, y: 0, w: 1, h: 1, static: true},
      {i: 'h', x: 0, y: 0, w: 1, h: 1, static: true}
    ];
    console.log('dow: ', this.state);
    return (
      <div style={{transform: 'scale(0.75) translate(-10%, -10%)'}}>
      <ReactGridLayout className="layout" cols={6} rowHeight={30} width={1200}>
        <div key="0T" className={this.getClass('0T')} data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>T</div>
        <div key="a" data-grid={{x: 0, y: 1, w: 1, h: 1, static: true}}>7:50am</div>
        <div key="b" data-grid={{x: 0, y: 2, w: 1, h: 1, static: true}}>bT</div>
        <div key="c" data-grid={{x: 0, y: 3, w: 1, h: 1, static: true}}>cT</div>
        <div key="d" data-grid={{x: 0, y: 4, w: 1, h: 1, static: true}}>9:50am</div>
        <div key="e" data-grid={{x: 0, y: 5, w: 1, h: 1, static: true}}>eT</div>
        <div key="f" data-grid={{x: 0, y: 6, w: 1, h: 1, static: true}}>fT</div>
        <div key="g" data-grid={{x: 0, y: 7, w: 1, h: 1, static: true}}>11:20am</div>
        <div key="h" data-grid={{x: 0, y: 8, w: 1, h: 1, static: true}}>hT</div>
        <div key="i" data-grid={{x: 0, y: 9, w: 1, h: 1, static: true}}>iT</div>
        <div key="j" className={this.getClass('j')} data-grid={{x: 0, y: 10, w: 1, h: 1, static: true}}>1:20pm</div>
        <div key="k" className={this.getClass('j')} data-grid={{x: 0, y: 11, w: 1, h: 1, static: true}}>jT</div>
        <div key="l" className={this.getClass('j')} data-grid={{x: 0, y: 12, w: 1, h: 1, static: true}}>jT</div>
        <div key="m" className={this.getClass('j')} data-grid={{x: 0, y: 13, w: 1, h: 1, static: true}}>3:00pm</div>

        <div key="moT" data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>mo</div>
        <div key="a1" className={this.getClass('Mon SS')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>Social Studies</div>
        {/* <div key="b1" data-grid={{x: 1, y: 2, w: 1, h: 2, static: true}}>boM</div> */}
        {/* <div key="c1" data-grid={{x: 1, y: 4, w: 5, h: 1, static: true}}>coM</div>
        <div key="d1" data-grid={{x: 1, y: 5, w: 1, h: 1, static: true}}>doM</div>
        <div key="e1" data-grid={{x: 1, y: 6, w: 1, h: 1, static: true}}>eoM</div>
        <div key="f1" data-grid={{x: 1, y: 7, w: 1, h: 2, static: true}}>doM</div>
        <div key="g1" data-grid={{x: 1, y: 9, w: 1, h: 1, static: true}}>eoM</div> */}
        <div key="b1" className={this.getClass('Mon Bio')} data-grid={{x: 1, y: 2, w: 1, h: 1, static: true}}>Biology</div>
        <div key="c1" className={this.getClass('Mon EMaths')} data-grid={{x: 1, y: 3, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="d1" className={this.getClass('Mon Makan')} data-grid={{x: 1, y: 4, w: 5, h: 1, static: true}}>B R E A K</div>
        <div key="e1" className={this.getClass('Mon AMaths')} data-grid={{x: 1, y: 5, w: 1, h: 1, static: true}}>Add Maths</div>
        <div key="f1" className={this.getClass('Mon Makan')} data-grid={{x: 1, y: 6, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="g1" className={this.getClass('Mon ChemL')} data-grid={{x: 1, y: 7, w: 1, h: 2, static: true}}>Chemistry (Lab)</div>
        <div key="h1" className={this.getClass('Mon Malay')} data-grid={{x: 1, y: 9, w: 1, h: 2, static: true}}>Malay</div>
        <div key="i1" className={this.getClass('Mon Bio')} data-grid={{x: 1, y: 11, w: 1, h: 2, static: true}}>Biology (m/u)</div>
        <div key="j1" className={this.getClass('Mon Malay')} data-grid={{x: 1, y: 13, w: 1, h: 1, static: true}}>Higher Malay</div>

        <div key="tuT" data-grid={{x: 2, y: 0, w: 1, h: 1, static: true}}>tu</div>
        <div key="a2" data-grid={{x: 2, y: 1, w: 1, h: 2, static: true}}>aT</div>
        <div key="b2" data-grid={{x: 2, y: 3, w: 1, h: 1, static: true}}>bT</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d2" data-grid={{x: 2, y: 5, w: 1, h: 1, static: true}}>dT</div>
        <div key="e2" data-grid={{x: 2, y: 6, w: 1, h: 1, static: true}}>eT</div>

        <div key="thT" data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d4" data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>dT</div>
        <div key="e4" data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>eT</div>

        <div key="weT" data-grid={{x: 3, y: 0, w: 1, h: 1, static: true}}>we</div>
        <div key="a3" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}>aW</div>
        <div key="b3" data-grid={{x: 3, y: 2, w: 1, h: 1, static: true}}>bW</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d3" data-grid={{x: 3, y: 3, w: 1, h: 1, static: true}}>dW</div>
        <div key="e3" data-grid={{x: 3, y: 5, w: 1, h: 1, static: true}}>eW</div>

        <div key="frT" data-grid={{x: 5, y: 0, w: 1, h: 1, static: true}}>fr</div>
        <div key="a5" data-grid={{x: 5, y: 1, w: 1, h: 2, static: true}}>aF</div>
        <div key="b5" data-grid={{x: 5, y: 3, w: 1, h: 1, static: true}}>bF</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d5" data-grid={{x: 5, y: 5, w: 1, h: 1, static: true}}>dF</div>
        <div key="e5" data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>eF</div>
      </ReactGridLayout>
      </div>    )
  }
}

// export default MyFirstGrid;
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
    let a = [{day: 'numeric'}, {month: 'short'}, {year: 'numeric'}];

    console.log('tdy: ', today);
    function  join(t, a, s) {
      function format(m) {
         let f = new Intl.DateTimeFormat('en', m);
         return f.format(t);
      }
      return a.map(format).join(s);
    };
    
    this.state = {
      dow: today.getDay(),
      dateTdy: join(today, a, ' '),
      hr: today.getHours(),
      numTime: today.getHours() * 100 + today.getMinutes()
    };

    console.log('Tdy: ', this.state.dateTdy);
    console.log('Hr: ', this.state.hr * 100);
    console.log('Time: ', this.state.numTime);
  };

  getClass(key) {
    var temp = "";
    //some code to return className
    if (key.includes("Monday") && this.state.dow == 0) {
      temp = temp + "Monday ";
    };
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
    return temp + key;
    // if ((key.length == 1) || (key[0] == '0')) {
    //   return 's1'
    // }
    // else {
    //   return '';
    // };
    // return 's1';
  };

  getTimeClass(key) {
    var integer = parseInt(key, 10);
    if (integer < this.state.numTime) {
      return 'pastTime'
    }
    else return '';
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
        <div key="0T" className={this.getClass('0T')} data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>{this.state.dateTdy}</div>
        <div key="a" className={this.getTimeClass('0750')} data-grid={{x: 0, y: 1, w: 1, h: 1, static: true}}>7:50am</div>
        <div key="b" className={this.getTimeClass('0750')} data-grid={{x: 0, y: 2, w: 1, h: 1, static: true}}>bT</div>
        <div key="c" className={this.getTimeClass('0750')} data-grid={{x: 0, y: 3, w: 1, h: 1, static: true}}>cT</div>
        <div key="d" className={this.getTimeClass('0950')} data-grid={{x: 0, y: 4, w: 1, h: 1, static: true}}>9:50am</div>
        <div key="e" className={this.getTimeClass('0750')} data-grid={{x: 0, y: 5, w: 1, h: 1, static: true}}>eT</div>
        <div key="f" className={this.getTimeClass('1040')} data-grid={{x: 0, y: 6, w: 1, h: 1, static: true}}>10:40am</div>
        <div key="g" className={this.getTimeClass('1120')} data-grid={{x: 0, y: 7, w: 1, h: 1, static: true}}>11:20am</div>
        <div key="h" className={this.getTimeClass('1200')} data-grid={{x: 0, y: 8, w: 1, h: 1, static: true}}>12:00nn</div>
        <div key="i" className={this.getTimeClass('1240')} data-grid={{x: 0, y: 9, w: 1, h: 1, static: true}}>12:40pm</div>
        <div key="j" className={this.getTimeClass('1320')} data-grid={{x: 0, y: 10, w: 1, h: 1, static: true}}>1:20pm</div>
        <div key="k" className={this.getTimeClass('1400')} data-grid={{x: 0, y: 11, w: 1, h: 1, static: true}}>2:00pm</div>
        <div key="l" className={this.getTimeClass('1440')} data-grid={{x: 0, y: 12, w: 1, h: 1, static: true}}>2:40pm</div>
        <div key="m" className={this.getTimeClass('1500')} data-grid={{x: 0, y: 13, w: 1, h: 1, static: true}}>3:00pm</div>

        <div key="moT" className={this.getClass('Monday')} data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>mo</div>
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
        {/* <div key="a2" data-grid={{x: 2, y: 1, w: 1, h: 2, static: true}}>aT</div>
        <div key="b2" data-grid={{x: 2, y: 3, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d2" data-grid={{x: 2, y: 5, w: 1, h: 1, static: true}}>dT</div>
        <div key="e2" data-grid={{x: 2, y: 6, w: 1, h: 1, static: true}}>eT</div>

        <div key="thT" data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d4" data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>dT</div>
        <div key="e4" data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>eT</div> */}
        <div key="a2" className={this.getClass('Even Tue PE')} data-grid={{x: 2, y: 1, w: 1, h: 1, static: true}}>Physical 
        Ed</div>
        <div key="b2" className={this.getClass('Even Tue EMaths')} data-grid={{x: 2, y: 2, w: 1, h: 2, static: true}}>Mathematics</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d2" className={this.getClass('Even Tue SS')} data-grid={{x: 2, y: 5, w: 1, h: 1, static: true}}>Social Studies</div>
        <div key="e2" className={this.getClass('Even Tue Hist')} data-grid={{x: 2, y: 6, w: 1, h: 2, static: true}}>History</div>
        <div key="f2" className={this.getClass('Even Tue Mon Makan')} data-grid={{x: 2, y: 8, w: 1, h: 1, static: true}}>LUNCH</div>
        {/* <div key="g2" className={this.getClass('Mon ChemL')} data-grid={{x: 2, y: 10, w: 1, h: 1, static: true}}>Chemistry (Lab)</div> */}
        <div key="h2" className={this.getClass('Even Tue BioL')} data-grid={{x: 2, y: 10, w: 1, h: 2, static: true}}>Biology (Lab)</div>

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
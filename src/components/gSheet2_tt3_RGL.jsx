import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

// moving the css here did it
import "../css/styles.css";
import "../css/example-styles.css";

import moment from 'moment';

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
    function join(t, a, s) {
      function format(m) {
         let f = new Intl.DateTimeFormat('en', m);
         return f.format(t);
      }
      return a.map(format).join(s);
    };
    function oddEven(ds) {
      function getWeekNumber1(thisDate) {
        var dt = new Date(thisDate);
        var thisDay = dt.getDate();
        
        var newDate = dt;
        newDate.setDate(1); // first day of month
        var digit = newDate.getDay();
        console.log('OE: ', newDate);
        
        var Q = (thisDay + digit) / 7;
        
        var R = (thisDay + digit) % 7;
        
        if (R !== 0) return Math.ceil(Q);
        else return Q;
      };
      function getWeekNumber2(d) {
        // Copy date so don't modify original
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
        // Return array of year and week number
        return [d.getUTCFullYear(), weekNo];
      };
      function weekPetersen(year,month,day) {
        function serial(days) { return 86400000*days; }
        function dateserial(year,month,day) { return (new Date(year,month-1,day).valueOf()); }
        function weekday(date) { return (new Date(date)).getDay()+1; }
        function yearserial(date) { return (new Date(date)).getFullYear(); }
        var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year,month,day), 
            date2 = dateserial(yearserial(date - serial(weekday(date-serial(1))) + serial(4)),1,3);
        return ~~((date - date2 + serial(weekday(date2) + 5))/ serial(7));
        // return 0;
      };

      // let myWOY = getWeekNumber1(today);
      // console.log('gW1: ', getWeekNumber1(ds));
      // let myWOY = getWeekNumber2(new Date('Jan 4, 2020'));
      let myWOY = getWeekNumber2(new Date(ds));
      // console.log('OE: ', getWeekNumber(today));
      console.log('gW2: ', myWOY);
      // console.log('petersen: ', weekPetersen("11 january 2016"));
      console.log('petersen: ', weekPetersen(ds));
      // console.log('petersen: ', weekPetersen(2016, 1, 11));
      if ((myWOY < 12) || (myWOY > 35)) {
        return (myWOY % 2 != 0)
      }
      else {
        return (myWOY % 2 == 0)
      };
    };
    
    this.state = {
      dow: today.getDay(),
      dateTdy: join(today, a, ' '),
      hr: today.getHours(),
      numTime: today.getHours() * 100 + today.getMinutes(),
      momento: moment().format('W')
    };

    console.log('Tdy: ', this.state.dateTdy);
    console.log('Hr: ', this.state.hr * 100);
    console.log('Time: ', this.state.numTime);
    // console.log('moment1: ', this.state.momento);
    let testDate = '11 may 2021';
    console.log('moment1: ', moment(testDate).format('W'));
    // console.log('oE: ', oddEven());
    console.log('oE: ', oddEven(testDate));
  };

  getClass(key) {
    var temp = "";
    //some code to return className
    console.log('K: ', key);
    if (key.includes("Monday") && this.state.dow == 0) {
      temp = temp + "Monday ";
    };
    if (key.includes("Monday") && this.state.dow != 1) {
      temp = temp + "notToday ";
    };
    if (key.includes("Tuesday") && this.state.dow != 2) {
      temp = temp + "notToday ";
    };
    if (key.includes("Wednesday") && this.state.dow != 3) {
      temp = temp + "notToday ";
    };
    if (key.includes("Mon") && this.state.dow == 1) {
      temp = temp + "isToday ";
    };
    if (key.includes("Tue") && this.state.dow == 2) {
      temp = temp + "isToday ";
    };
    if (key.includes("Wed") && this.state.dow == 3) {
      temp = temp + "isToday ";
    };
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
    console.log('K1: ', temp + key);
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

        <div key="tuT" className={this.getClass('Tuesday')} data-grid={{x: 2, y: 0, w: 1, h: 1, static: true}}>tu</div>
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

        <div key="weT" className={this.getClass('Wednesday')} data-grid={{x: 3, y: 0, w: 1, h: 1, static: true}}>we</div>
        {/* <div key="a3" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}>aW</div>
        <div key="b3" data-grid={{x: 3, y: 2, w: 1, h: 1, static: true}}>bW</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d3" data-grid={{x: 3, y: 3, w: 1, h: 1, static: true}}>dW</div>
        <div key="e3" data-grid={{x: 3, y: 5, w: 1, h: 1, static: true}}>eW</div> */}
        <div key="a3" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}>aW</div>
        <div key="b3" className={this.getClass('Even Wed Hist')} data-grid={{x: 3, y: 2, w: 1, h: 1, static: true}}>History</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d3" className={this.getClass('Even Wed Eng')} data-grid={{x: 3, y: 3, w: 1, h: 1, static: true}}>English</div>
        <div key="e3" className={this.getClass('Even Wed Eng')} data-grid={{x: 3, y: 5, w: 1, h: 1, static: true}}>English</div>
        <div key="f3" className={this.getClass('Even Wed AMaths')} data-grid={{x: 3, y: 6, w: 1, h: 1, static: true}}>Add Maths</div>
        <div key="g3" className={this.getClass('Even Wed Mon Makan')} data-grid={{x: 3, y: 7, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="h3" className={this.getClass('Even Wed PE')} data-grid={{x: 3, y: 8, w: 1, h: 2, static: true}}>Physical Ed</div>
        <div key="i3" className={this.getClass('Even Wed Malay')} data-grid={{x: 3, y: 10, w: 1, h: 2, static: true}}>Malay</div>

        <div key="thT" data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        {/* <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d4" data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>dT</div>
        <div key="e4" data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>eT</div> */}
        <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>CCE</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>Assembly</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d4" data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="e4" data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>Chemistry</div>
        <div key="f4" data-grid={{x: 4, y: 6, w: 1, h: 2, static: true}}>Add Maths</div>
        <div key="g4" data-grid={{x: 4, y: 8, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="h4" data-grid={{x: 4, y: 9, w: 1, h: 2, static: true}}>English</div>

        <div key="frT" data-grid={{x: 5, y: 0, w: 1, h: 1, static: true}}>fr</div>
        {/* <div key="a5" data-grid={{x: 5, y: 1, w: 1, h: 2, static: true}}>aF</div>
        <div key="b5" data-grid={{x: 5, y: 3, w: 1, h: 1, static: true}}>bF</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d5" data-grid={{x: 5, y: 5, w: 1, h: 1, static: true}}>dF</div>
        <div key="e5" data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>eF</div> */}
        <div key="a5" data-grid={{x: 5, y: 3, w: 1, h: 1, static: true}}>Malay</div>
        <div key="b5" data-grid={{x: 5, y: 5, w: 1, h: 1, static: true}}>LUNCH</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d5" data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>English</div>
        <div key="e5" data-grid={{x: 5, y: 7, w: 1, h: 2, static: true}}>Chemistry</div>
      </ReactGridLayout>
      </div>    )
  }
}

// export default MyFirstGrid;
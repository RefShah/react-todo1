import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

// moving the css here did it
import "../css/styles.css";
import "../css/example-styles.css";

// import moment from 'moment';

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
      // function getWeekNumber1(thisDate) { // i think this get Wk of Mth
      //   var dt = new Date(thisDate);
      //   var thisDay = dt.getDate();
        
      //   var newDate = dt;
      //   newDate.setDate(1); // first day of month
      //   var digit = newDate.getDay();
      //   console.log('OE: ', newDate);
        
      //   var Q = (thisDay + digit) / 7;
        
      //   var R = (thisDay + digit) % 7;
        
      //   if (R !== 0) return Math.ceil(Q);
      //   else return Q;
      // };
      // function getWeekNumber2(d) {
      //   // Copy date so don't modify original
      //   d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
      //   // Set to nearest Thursday: current date + 4 - current day number
      //   // Make Sunday's day number 7
      //   d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
      //   // Get first day of year
      //   var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
      //   // Calculate full weeks to nearest Thursday
      //   var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
      //   // Return array of year and week number
      //   return [d.getUTCFullYear(), weekNo];
      // };
      // function weekPetersen(year,month,day) {
      //   function serial(days) { return 86400000*days; }
      //   function dateserial(year,month,day) { return (new Date(year,month-1,day).valueOf()); }
      //   function weekday(date) { return (new Date(date)).getDay()+1; }
      //   function yearserial(date) { return (new Date(date)).getFullYear(); }
      //   var date = year instanceof Date ? year.valueOf() : typeof year === "string" ? new Date(year).valueOf() : dateserial(year,month,day), 
      //       date2 = dateserial(yearserial(date - serial(weekday(date-serial(1))) + serial(4)),1,3);
      //   return ~~((date - date2 + serial(weekday(date2) + 5))/ serial(7));
      //   // return 0;
      // };
      function getWeek(date) {
        if (!(date instanceof Date)) date = new Date();
      
        console.log('30: ', date);
        // ISO week date weeks start on Monday, so correct the day number
        // var nDay = (date.getDay() + 6) % 7;
        var nDay = (date.getDay() + 7) % 7;
        console.log('3a: ', nDay);
        // on a Wed, nDay = 3; Sat 6
      
        // ISO 8601 states that week 1 is the week with the first Thursday of that year
        // Set the target date to the Thursday in the target week
        // date.setDate(date.getDate() - nDay + 3);
        date.setDate(date.getDate() - nDay + 1);
        console.log('3b: ', date);
        // seems like set to the Monday before specified date
      
        // Store the millisecond value of the target date
        var n1stThursday = date.valueOf();
        console.log('3c: ', n1stThursday);
      
        // Set the target to the first Thursday of the year
        // First, set the target to January 1st
        date.setMonth(0, 1);
      
        // Not a Thursday? Correct the date to the next Thursday
        // if (date.getDay() !== 4) {
        //   date.setMonth(0, 1 + ((4 - date.getDay()) + 7) % 7);
        // }
        if (date.getDay() !== 1) {
          date.setMonth(0, 1 + ((1 - date.getDay()) + 7) % 7);
        }
      
        // The week number is the number of weeks between the first Thursday of the year
        // and the Thursday in the target week (604800000 = 7 * 24 * 3600 * 1000)
        return 1 + Math.ceil((n1stThursday - date) / 604800000);
      };

      // let myWOY = getWeekNumber1(today);
      // console.log('gW1: ', getWeekNumber1(ds));
      // let myWOY = getWeekNumber2(new Date(ds));
      let myWOY = getWeek(new Date());
      // console.log('OE: ', getWeekNumber(today));
      console.log('gW2: ', myWOY);
      // console.log('petersen: ', weekPetersen("11 january 2016"));
      // console.log('petersen: ', weekPetersen(ds));
      console.log('gW3: ', getWeek(new Date(ds)));
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
      // isOdd: oddEven(''),
      isOdd: oddEven(),
      display: 'none'
      // momento: moment().format('W')
    };

    console.log('Tdy: ', this.state.dateTdy);
    console.log('Hr: ', this.state.hr * 100);
    console.log('Time: ', this.state.numTime);
    // 010119 Tue: wrong
    // 010118 Mon: ok
    // 010117 Sun: ok
    let testDate = '5 jan 2019';
    // console.log('moment1: ', moment(testDate).format('W'));
    // console.log('oE: ', oddEven());
    console.log('oE: ', oddEven(testDate));
  };

  getClass(key) {
    var temp = "";
    //some code to return className
    // console.log('K: ', key);
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
    if (key.includes("Thursday") && this.state.dow != 4) {
      temp = temp + "notToday ";
    };
    if (key.includes("Friday") && this.state.dow != 5) {
      temp = temp + "notToday ";
    };
    // if (key.includes("Mon") && this.state.dow == 1) {
    //   temp = temp + "isToday ";
    // };
    // if (key.includes("Wed") && this.state.dow == 3) {
    //   temp = temp + "isToday ";
    // };
    if ((key.includes("Mon") && this.state.dow == 1) || 
        (key.includes("Tue") && this.state.dow == 2) ||
        (key.includes("Wed") && this.state.dow == 3) ||
        (key.includes("Thu") && this.state.dow == 4) ||
        (key.includes("Fri") && this.state.dow == 5)) {
          temp = temp + "isToday ";
    };
    if (key.includes("Even") && this.state.isOdd) {
      temp = temp + "oeHide ";
    };
    if (key.includes("Odd") && !this.state.isOdd) {
      temp = temp + "oeHide ";
    };
    // if (key.includes("Bio")) {
    //   temp = temp + "Bio ";
    // };
    // if (key.includes("EMaths")) {
    //   temp = temp + "Bio ";
    // };
    // console.log('K1: ', temp + key);
    return temp + key;
  };

  getTimeClass(key) {
    var integer = parseInt(key, 10);
    if (integer < this.state.numTime) {
      return 'pastTime'
    }
    else return '';
  };

  getLayoutClass(oe) {
    if (oe.includes("Even") && this.state.isOdd) {
      // return "display: 'none'";
      return "layout oeHide"
    };
    if (oe.includes("Odd") && !this.state.isOdd) {
      // return "display: 'none'";
      return "layout oeHide"
    };
    // if (integer < this.state.numTime) {
    //   return 'pastTime'
    // }
    // else return '';
  };

  getOEText() {
    if (this.state.isOdd) {
      return "O"
    }
    else return "E";
  };

  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      {i: 'a', x: 0, y: 0, w: 1, h: 1, static: true},
      {i: 'b', x: 0, y: 0, w: 1, h: 1, static: true},
      {i: 'd', x: 0, y: 1, w: 1, h: 2, static: true},
      {i: 'c', x: 4, y: 0, w: 1, h: 2}
    ];
    console.log('dow: ', this.state); // style={{display: this.state.display}} 
    return (
      <div style={{transform: 'scale(0.75) translate(-10%, -10%)'}}>
      {/* <div className="subj2 parent" style={{ width: "100px", height: "50px" }}>
        <ScaleText maxFontSize={20}>
        <span className="child text">Text</span>
        </ScaleText>
      </div> */}
      <div className="subj2 " style={{ width: "100px", height: "30px" }}>
        <ScaleText maxFontSize={20}>
        <span className="">Loooong Quite A Long Text</span>
        </ScaleText>
      </div>
      <ReactGridLayout className={this.getLayoutClass('Odd')} cols={7} rowHeight={30} width={1200}>
        {/* <div key="0T" className={this.getClass('0T')} data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>{this.state.dateTdy}</div> */}
        <div key="0T" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>{this.state.dateTdy} - </div>
        {/* <div key="a" className={this.getTimeClass('0750')} data-grid={{x: 0, y: 1, w: 1, h: 1, static: true}}>
          7:500am
        </div> */}
        <div key="a" className={this.getTimeClass('0750')} data-grid={{x: 0, y: 1, w: 1, h: 1, static: true}}>
        <ScaleText maxFontSize={20}>
        <span className="">Loooong Quite A Loooong Text</span>
        </ScaleText>
        </div>
        <div key="b" className={this.getTimeClass('0830')} data-grid={{x: 0, y: 2, w: 1, h: 1, static: true}}>8:30am</div>
        <div key="c" className={this.getTimeClass('0910')} data-grid={{x: 0, y: 3, w: 1, h: 1, static: true}}>9:10am</div>
        <div key="d" className={this.getTimeClass('0950')} data-grid={{x: 0, y: 4, w: 1, h: 1, static: true}}>9:50am</div>
        <div key="e" className={this.getTimeClass('1000')} data-grid={{x: 0, y: 5, w: 1, h: 1, static: true}}>10:00am</div>
        <div key="f" className={this.getTimeClass('1040')} data-grid={{x: 0, y: 6, w: 1, h: 1, static: true}}>10:40am</div>
        <div key="g" className={this.getTimeClass('1120')} data-grid={{x: 0, y: 7, w: 1, h: 1, static: true}}>11:20am</div>
        <div key="h" className={this.getTimeClass('1200')} data-grid={{x: 0, y: 8, w: 1, h: 1, static: true}}>12:00nn</div>
        <div key="i" className={this.getTimeClass('1240')} data-grid={{x: 0, y: 9, w: 1, h: 1, static: true}}>12:40pm</div>
        <div key="j" className={this.getTimeClass('1320')} data-grid={{x: 0, y: 10, w: 1, h: 1, static: true}}>1:20pm</div>
        <div key="k" className={this.getTimeClass('1400')} data-grid={{x: 0, y: 11, w: 1, h: 1, static: true}}>2:00pm</div>
        <div key="l" className={this.getTimeClass('1440')} data-grid={{x: 0, y: 12, w: 1, h: 1, static: true}}>2:40pm</div>
        <div key="m" className={this.getTimeClass('1500')} data-grid={{x: 0, y: 13, w: 1, h: 1, static: true}}>3:00pm</div>
        <div key="o" className={this.getTimeClass('1600')} data-grid={{x: 0, y: 14, w: 1, h: 1, static: true}}>4:00pm</div>

        <div key="moT" className={this.getClass('Monday')} data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>mo</div>
        {/* <div key="ao1" className={this.getClass('Odd Mon AMaths')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>Add Maths</div> */}
        {/* <div key="ao1" className={this.getClass('Odd Mon AMaths')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>
          Additional Mathematics
        </div> */}
        <div key="ao1" className={this.getClass('Odd Mon AMaths')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>
        <ScaleText maxFontSize={20}>
        <span className="">Additional Mathematics</span>
        </ScaleText>
        </div>
        {/* <div key="a1" className={this.getClass('Even Mon SS')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>Social Studies</div> */}
        <div key="b1" className={this.getClass('Odd Mon Malay')} data-grid={{x: 1, y: 2, w: 1, h: 2, static: true}}>Malay</div>
        {/* <div key="c1" data-grid={{x: 1, y: 4, w: 5, h: 1, static: true}}>coM</div>
        <div key="d1" data-grid={{x: 1, y: 5, w: 1, h: 1, static: true}}>doM</div>
        <div key="e1" data-grid={{x: 1, y: 6, w: 1, h: 1, static: true}}>eoM</div>
        <div key="f1" data-grid={{x: 1, y: 7, w: 1, h: 2, static: true}}>doM</div>
        <div key="g1" data-grid={{x: 1, y: 9, w: 1, h: 1, static: true}}>eoM</div> */}
        <div key="d1" className={this.getClass('Odd Mon Makan')} data-grid={{x: 1, y: 4, w: 5, h: 1, static: true}}>B R E A K</div>
        <div key="e1" className={this.getClass('Odd Mon Eng')} data-grid={{x: 1, y: 5, w: 1, h: 1, static: true}}>English</div>
        <div key="f1" className={this.getClass('Odd Mon Makan')} data-grid={{x: 1, y: 6, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="g1" className={this.getClass('Odd Mon ChemL')} data-grid={{x: 1, y: 7, w: 1, h: 2, static: true}}>Chemistry (Lab)</div>
        <div key="h1" className={this.getClass('Odd Mon Malay')} data-grid={{x: 1, y: 9, w: 1, h: 1, static: true}}>CCE</div>
        {/* <div key="i1" className={this.getClass('Even Mon Bio')} data-grid={{x: 1, y: 11, w: 1, h: 2, static: true}}>Biology (m/u)</div> */}
        <div key="j1" className={this.getClass('Odd Mon Malay')} data-grid={{x: 1, y: 13, w: 1, h: 1, static: true}}>Higher Malay</div>

        <div key="tuT" className={this.getClass('Tuesday')} data-grid={{x: 2, y: 0, w: 1, h: 1, static: true}}>tu</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d2" data-grid={{x: 2, y: 5, w: 1, h: 1, static: true}}>dT</div>
        <div key="e2" data-grid={{x: 2, y: 6, w: 1, h: 1, static: true}}>eT</div>

        <div key="thT" data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d4" data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>dT</div>
        <div key="e4" data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>eT</div> */}
        <div key="a2" className={this.getClass('Odd Tue SS')} data-grid={{x: 2, y: 1, w: 1, h: 2, static: true}}>Social 
        Studies</div>
        <div key="b2" className={this.getClass('Odd Tue EMaths')} data-grid={{x: 2, y: 3, w: 1, h: 1, static: true}}>Mathematics</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d2" className={this.getClass('Odd Tue EMaths')} data-grid={{x: 2, y: 5, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="e2" className={this.getClass('Odd Tue Malay')} data-grid={{x: 2, y: 6, w: 1, h: 1, static: true}}>Malay</div>
        <div key="f2" className={this.getClass('Odd Tue Mon BioL')} data-grid={{x: 2, y: 7, w: 1, h: 2, static: true}}>Biology</div>
        <div key="g2" className={this.getClass('Tue Makan')} data-grid={{x: 2, y: 9, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="h2" className={this.getClass('Odd Tue Bio')} data-grid={{x: 2, y: 10, w: 1, h: 2, static: true}}>Biology (m/u)</div>

        <div key="weT" className={this.getClass('Wednesday')} data-grid={{x: 3, y: 0, w: 1, h: 1, static: true}}>Wednesday</div>
        {/* <div key="a3" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}>aW</div>
        <div key="b3" data-grid={{x: 3, y: 2, w: 1, h: 1, static: true}}>bW</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d3" data-grid={{x: 3, y: 3, w: 1, h: 1, static: true}}>dW</div>
        <div key="e3" data-grid={{x: 3, y: 5, w: 1, h: 1, static: true}}>eW</div> */}
        <div key="a3" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}>aW</div>
        <div key="b3" className={this.getClass('Odd Wed AMaths')} data-grid={{x: 3, y: 2, w: 1, h: 1, static: true}}>Add Maths</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d3" className={this.getClass('Odd Wed EMaths')} data-grid={{x: 3, y: 3, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="e3" className={this.getClass('Odd Wed EMaths')} data-grid={{x: 3, y: 5, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="f3" className={this.getClass('Odd Wed Chem')} data-grid={{x: 3, y: 6, w: 1, h: 1, static: true}}>Chemistry</div>
        <div key="g3" className={this.getClass('Odd Wed Mon PE')} data-grid={{x: 3, y: 7, w: 1, h: 1, static: true}}>Physical Ed</div>
        {/* <div key="h3" className={this.getClass('Even Wed PE')} data-grid={{x: 3, y: 8, w: 1, h: 1, static: true}}>Physical Ed</div> */}
        <div key="i3" className={this.getClass('Odd Wed Makan')} data-grid={{x: 3, y: 9, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="j3" className={this.getClass('Odd Wed Malay')} data-grid={{x: 3, y: 10, w: 1, h: 1, static: true}}>Malay</div>
        <div key="k3" className={this.getClass('Odd Wed Hist')} data-grid={{x: 3, y: 11, w: 1, h: 1, static: true}}>History</div>

        <div key="thT" className={this.getClass('Thursday')} data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        {/* <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d4" data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>dT</div>
        <div key="e4" data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>eT</div> */}
        <div key="a4" className={this.getClass('Odd Thu Malay')} data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>CCE</div>
        <div key="b4" className={this.getClass('Odd Thu Malay')} data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>Assembly</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d4" className={this.getClass('Odd Thu Eng')} data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>English</div>
        <div key="e4" className={this.getClass('Odd Thu Eng')} data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>English</div>
        <div key="f4" className={this.getClass('Odd Thu EMaths')} data-grid={{x: 4, y: 6, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="g4" className={this.getClass('Odd Thu Makan')} data-grid={{x: 4, y: 7, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="h4" className={this.getClass('Odd Thu PE')} data-grid={{x: 4, y: 8, w: 1, h: 2, static: true}}>Physical Ed</div>
        <div key="i4" className={this.getClass('Odd Thu AMaths')} data-grid={{x: 4, y: 10, w: 1, h: 2, static: true}}>Add Maths</div>

        <div key="frT" className={this.getClass('Friday')} data-grid={{x: 5, y: 0, w: 1, h: 1, static: true}}>Friday</div>
        <div key="a5" className={this.getClass('Odd Fri Eng')} data-grid={{x: 5, y: 1, w: 1, h: 2, static: true}}>English</div>
        <div key="b5" className={this.getClass('Odd Fri Hist')} data-grid={{x: 5, y: 3, w: 1, h: 1, static: true}}>History</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d5" className={this.getClass('Odd Fri SS')} data-grid={{x: 5, y: 5, w: 1, h: 1, static: true}}>Social Studies</div>
        <div key="e5" className={this.getClass('Odd Fri Makan')} data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="f5" className={this.getClass('Odd Fri Chem')} data-grid={{x: 5, y: 7, w: 1, h: 1, static: true}}>Chemistry</div>
        <div key="g5" className={this.getClass('Odd Fri Bio')} data-grid={{x: 5, y: 8, w: 1, h: 1, static: true}}>Biology</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d5" className={this.getClass('Odd Fri Eng')} data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>English</div>
        <div key="e5" className={this.getClass('Odd Fri Chem')} data-grid={{x: 5, y: 7, w: 1, h: 2, static: true}}>Chemistry</div> */}

        <div key="az" className={this.getTimeClass('0750')} data-grid={{x: 6, y: 1, w: 1, h: 1, static: true}}>7:50am</div>
        <div key="bz" className={this.getTimeClass('0830')} data-grid={{x: 6, y: 2, w: 1, h: 1, static: true}}>8:30am</div>
        <div key="cz" className={this.getTimeClass('0910')} data-grid={{x: 6, y: 3, w: 1, h: 1, static: true}}>9:10am</div>
        <div key="dz" className={this.getTimeClass('0950')} data-grid={{x: 6, y: 4, w: 1, h: 1, static: true}}>9:50am</div>
        <div key="ez" className={this.getTimeClass('1000')} data-grid={{x: 6, y: 5, w: 1, h: 1, static: true}}>10:00am</div>
        <div key="fz" className={this.getTimeClass('1040')} data-grid={{x: 6, y: 6, w: 1, h: 1, static: true}}>10:40am</div>
        <div key="gz" className={this.getTimeClass('1120')} data-grid={{x: 6, y: 7, w: 1, h: 1, static: true}}>11:20am</div>
        <div key="hz" className={this.getTimeClass('1200')} data-grid={{x: 6, y: 8, w: 1, h: 1, static: true}}>12:00nn</div>
        <div key="iz" className={this.getTimeClass('1240')} data-grid={{x: 6, y: 9, w: 1, h: 1, static: true}}>12:40pm</div>
        <div key="jz" className={this.getTimeClass('1320')} data-grid={{x: 6, y: 10, w: 1, h: 1, static: true}}>1:20pm</div>
        <div key="kz" className={this.getTimeClass('1400')} data-grid={{x: 6, y: 11, w: 1, h: 1, static: true}}>2:00pm</div>
        <div key="lz" className={this.getTimeClass('1440')} data-grid={{x: 6, y: 12, w: 1, h: 1, static: true}}>2:40pm</div>
        <div key="mz" className={this.getTimeClass('1500')} data-grid={{x: 6, y: 13, w: 1, h: 1, static: true}}>3:00pm</div>
        <div key="nz" className={this.getTimeClass('1600')} data-grid={{x: 6, y: 14, w: 1, h: 1, static: true}}>4:00pm</div>
      </ReactGridLayout>
      <ReactGridLayout className={this.getLayoutClass('Even')} cols={7} rowHeight={30} width={1200}>
        {/* <div key="0T" className={this.getClass('0T')} data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>{this.state.dateTdy}</div> */}
        <div key="0T" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>{this.state.dateTdy} - {this.getOEText()}</div>
        <div key="a" className={this.getTimeClass('0750')} data-grid={{x: 0, y: 1, w: 1, h: 1, static: true}}>7:50am</div>
        <div key="b" className={this.getTimeClass('0830')} data-grid={{x: 0, y: 2, w: 1, h: 1, static: true}}>8:30am</div>
        <div key="c" className={this.getTimeClass('0910')} data-grid={{x: 0, y: 3, w: 1, h: 1, static: true}}>9:10am</div>
        <div key="d" className={this.getTimeClass('0950')} data-grid={{x: 0, y: 4, w: 1, h: 1, static: true}}>9:50am</div>
        <div key="e" className={this.getTimeClass('1000')} data-grid={{x: 0, y: 5, w: 1, h: 1, static: true}}>10:00am</div>
        <div key="f" className={this.getTimeClass('1040')} data-grid={{x: 0, y: 6, w: 1, h: 1, static: true}}>10:40am</div>
        <div key="g" className={this.getTimeClass('1120')} data-grid={{x: 0, y: 7, w: 1, h: 1, static: true}}>11:20am</div>
        <div key="h" className={this.getTimeClass('1200')} data-grid={{x: 0, y: 8, w: 1, h: 1, static: true}}>12:00nn</div>
        <div key="i" className={this.getTimeClass('1240')} data-grid={{x: 0, y: 9, w: 1, h: 1, static: true}}>12:40pm</div>
        <div key="j" className={this.getTimeClass('1320')} data-grid={{x: 0, y: 10, w: 1, h: 1, static: true}}>1:20pm</div>
        <div key="k" className={this.getTimeClass('1400')} data-grid={{x: 0, y: 11, w: 1, h: 1, static: true}}>2:00pm</div>
        <div key="l" className={this.getTimeClass('1440')} data-grid={{x: 0, y: 12, w: 1, h: 1, static: true}}>2:40pm</div>
        <div key="m" className={this.getTimeClass('1500')} data-grid={{x: 0, y: 13, w: 1, h: 1, static: true}}>3:00pm</div>
        <div key="n" className={this.getTimeClass('1600')} data-grid={{x: 0, y: 14, w: 1, h: 1, static: true}}>4:00pm</div>

        <div key="moT" className={this.getClass('Monday')} data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>mo</div>
        {/* <div key="ao1" className={this.getClass('Odd Mon AMaths')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>Add Maths</div> */}
        <div key="a1" className={this.getClass('Even Mon SS')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>Social Studies</div>
        {/* <div key="b1" data-grid={{x: 1, y: 2, w: 1, h: 2, static: true}}>boM</div> */}
        <div key="b1" className={this.getClass('Even Mon Bio')} data-grid={{x: 1, y: 2, w: 1, h: 1, static: true}}>Biology</div>
        <div key="c1" className={this.getClass('Even Mon EMaths')} data-grid={{x: 1, y: 3, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="d1" className={this.getClass('Even Mon Makan')} data-grid={{x: 1, y: 4, w: 5, h: 1, static: true}}>B R E A K</div>
        <div key="e1" className={this.getClass('Even Mon AMaths')} data-grid={{x: 1, y: 5, w: 1, h: 1, static: true}}>Add Maths</div>
        <div key="f1" className={this.getClass('Even Mon Makan')} data-grid={{x: 1, y: 6, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="g1" className={this.getClass('Even Mon ChemL')} data-grid={{x: 1, y: 7, w: 1, h: 2, static: true}}>Chemistry (Lab)</div>
        <div key="h1" className={this.getClass('Even Mon Malay')} data-grid={{x: 1, y: 9, w: 1, h: 2, static: true}}>Malay</div>
        <div key="i1" className={this.getClass('Even Mon Bio')} data-grid={{x: 1, y: 11, w: 1, h: 2, static: true}}>Biology (m/u)</div>
        <div key="j1" className={this.getClass('Even Mon Malay')} data-grid={{x: 1, y: 13, w: 1, h: 1, static: true}}>Higher Malay</div>

        <div key="tuT" className={this.getClass('Tuesday')} data-grid={{x: 2, y: 0, w: 1, h: 1, static: true}}>tu</div>
        {/* <div key="a2" data-grid={{x: 2, y: 1, w: 1, h: 2, static: true}}>aT</div>
        <div key="b2" data-grid={{x: 2, y: 3, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
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

        <div key="thT" className={this.getClass('Thursday')} data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        {/* <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="a4" className={this.getClass('Even Thu Malay')} data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>CCE</div>
        <div key="b4" className={this.getClass('Even Thu Malay')} data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>Assembly</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d4" className={this.getClass('Even Thu EMaths')} data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="e4" className={this.getClass('Even Thu Chem')} data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>Chemistry</div>
        <div key="f4" className={this.getClass('Even Thu AMaths')} data-grid={{x: 4, y: 6, w: 1, h: 2, static: true}}>Add Maths</div>
        <div key="g4" className={this.getClass('Even Thu Makan')} data-grid={{x: 4, y: 8, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="h4" className={this.getClass('Even Thu Eng')} data-grid={{x: 4, y: 9, w: 1, h: 2, static: true}}>English</div>

        <div key="frT" className={this.getClass('Friday')} data-grid={{x: 5, y: 0, w: 1, h: 1, static: true}}>Friday</div>
        {/* <div key="a5" data-grid={{x: 5, y: 1, w: 1, h: 2, static: true}}>aF</div>
        <div key="b5" data-grid={{x: 5, y: 3, w: 1, h: 1, static: true}}>bF</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d5" data-grid={{x: 5, y: 5, w: 1, h: 1, static: true}}>dF</div>
        <div key="e5" data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>eF</div> */}
        <div key="a5" className={this.getClass('Even Fri Malay')} data-grid={{x: 5, y: 3, w: 1, h: 1, static: true}}>Malay</div>
        <div key="b5" className={this.getClass('Even Fri Makan')} data-grid={{x: 5, y: 5, w: 1, h: 1, static: true}}>LUNCH</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d5" className={this.getClass('Even Fri Eng')} data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>English</div>
        <div key="e5" className={this.getClass('Even Fri Chem')} data-grid={{x: 5, y: 7, w: 1, h: 2, static: true}}>Chemistry</div>

        <div key="az" className={this.getTimeClass('0750')} data-grid={{x: 6, y: 1, w: 1, h: 1, static: true}}>7:50am</div>
        <div key="bz" className={this.getTimeClass('0830')} data-grid={{x: 6, y: 2, w: 1, h: 1, static: true}}>8:30am</div>
        <div key="cz" className={this.getTimeClass('0910')} data-grid={{x: 6, y: 3, w: 1, h: 1, static: true}}>9:10am</div>
        <div key="dz" className={this.getTimeClass('0950')} data-grid={{x: 6, y: 4, w: 1, h: 1, static: true}}>9:50am</div>
        <div key="ez" className={this.getTimeClass('1000')} data-grid={{x: 6, y: 5, w: 1, h: 1, static: true}}>10:00am</div>
        <div key="fz" className={this.getTimeClass('1040')} data-grid={{x: 6, y: 6, w: 1, h: 1, static: true}}>10:40am</div>
        <div key="gz" className={this.getTimeClass('1120')} data-grid={{x: 6, y: 7, w: 1, h: 1, static: true}}>11:20am</div>
        <div key="hz" className={this.getTimeClass('1200')} data-grid={{x: 6, y: 8, w: 1, h: 1, static: true}}>12:00nn</div>
        <div key="iz" className={this.getTimeClass('1240')} data-grid={{x: 6, y: 9, w: 1, h: 1, static: true}}>12:40pm</div>
        <div key="jz" className={this.getTimeClass('1320')} data-grid={{x: 6, y: 10, w: 1, h: 1, static: true}}>1:20pm</div>
        <div key="kz" className={this.getTimeClass('1400')} data-grid={{x: 6, y: 11, w: 1, h: 1, static: true}}>2:00pm</div>
        <div key="lz" className={this.getTimeClass('1440')} data-grid={{x: 6, y: 12, w: 1, h: 1, static: true}}>2:40pm</div>
        <div key="mz" className={this.getTimeClass('1500')} data-grid={{x: 6, y: 13, w: 1, h: 1, static: true}}>3:00pm</div>
        <div key="nz" className={this.getTimeClass('1600')} data-grid={{x: 6, y: 14, w: 1, h: 1, static: true}}>4:00pm</div>
      </ReactGridLayout>
      <ReactGridLayout className={this.getLayoutClass('Even')} cols={7} rowHeight={30} width={1200}>
        <div key="0T" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>Odd Week</div>
        <div key="a" className={this.getTimeClass('0750')} data-grid={{x: 0, y: 1, w: 1, h: 1, static: true}}>7:50am</div>
        <div key="b" className={this.getTimeClass('0830')} data-grid={{x: 0, y: 2, w: 1, h: 1, static: true}}>8:30am</div>
        <div key="c" className={this.getTimeClass('0910')} data-grid={{x: 0, y: 3, w: 1, h: 1, static: true}}>9:10am</div>
        <div key="d" className={this.getTimeClass('0950')} data-grid={{x: 0, y: 4, w: 1, h: 1, static: true}}>9:50am</div>
        <div key="e" className={this.getTimeClass('1000')} data-grid={{x: 0, y: 5, w: 1, h: 1, static: true}}>10:00am</div>
        <div key="f" className={this.getTimeClass('1040')} data-grid={{x: 0, y: 6, w: 1, h: 1, static: true}}>10:40am</div>
        <div key="g" className={this.getTimeClass('1120')} data-grid={{x: 0, y: 7, w: 1, h: 1, static: true}}>11:20am</div>
        <div key="h" className={this.getTimeClass('1200')} data-grid={{x: 0, y: 8, w: 1, h: 1, static: true}}>12:00nn</div>
        <div key="i" className={this.getTimeClass('1240')} data-grid={{x: 0, y: 9, w: 1, h: 1, static: true}}>12:40pm</div>
        <div key="j" className={this.getTimeClass('1320')} data-grid={{x: 0, y: 10, w: 1, h: 1, static: true}}>1:20pm</div>
        <div key="k" className={this.getTimeClass('1400')} data-grid={{x: 0, y: 11, w: 1, h: 1, static: true}}>2:00pm</div>
        <div key="l" className={this.getTimeClass('1440')} data-grid={{x: 0, y: 12, w: 1, h: 1, static: true}}>2:40pm</div>
        <div key="m" className={this.getTimeClass('1500')} data-grid={{x: 0, y: 13, w: 1, h: 1, static: true}}>3:00pm</div>
        {/* <div key="n" className={this.getTimeClass('1600')} data-grid={{x: 0, y: 13, w: 1, h: 1, static: true}}>3:00pm</div> */}
        <div key="o" className={this.getTimeClass('1600')} data-grid={{x: 0, y: 14, w: 1, h: 1, static: true}}>4:00pm</div>

        <div key="moT" className={this.getClass('Monday')} data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>mo</div>
        <div key="ao1" className={this.getClass('not Even Mon AMaths')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>Add Maths</div>
        {/* <div key="a1" className={this.getClass('Even Mon SS')} data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>Social Studies</div> */}
        <div key="b1" className={this.getClass('not Even Mon Malay')} data-grid={{x: 1, y: 2, w: 1, h: 2, static: true}}>Malay</div>
        {/* <div key="c1" data-grid={{x: 1, y: 4, w: 5, h: 1, static: true}}>coM</div>
        <div key="d1" data-grid={{x: 1, y: 5, w: 1, h: 1, static: true}}>doM</div>
        <div key="e1" data-grid={{x: 1, y: 6, w: 1, h: 1, static: true}}>eoM</div>
        <div key="f1" data-grid={{x: 1, y: 7, w: 1, h: 2, static: true}}>doM</div>
        <div key="g1" data-grid={{x: 1, y: 9, w: 1, h: 1, static: true}}>eoM</div> */}
        {/* <div key="b1" className={this.getClass('Even Mon Bio')} data-grid={{x: 1, y: 2, w: 1, h: 1, static: true}}>Biology</div>
        <div key="c1" className={this.getClass('Even Mon EMaths')} data-grid={{x: 1, y: 3, w: 1, h: 1, static: true}}>Mathematics</div> */}
        <div key="d1" className={this.getClass('not Even Mon Makan')} data-grid={{x: 1, y: 4, w: 5, h: 1, static: true}}>B R E A K</div>
        <div key="e1" className={this.getClass('not Even Mon Eng')} data-grid={{x: 1, y: 5, w: 1, h: 1, static: true}}>English</div>
        <div key="f1" className={this.getClass('not Even Mon Makan')} data-grid={{x: 1, y: 6, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="g1" className={this.getClass('not Even Mon ChemL')} data-grid={{x: 1, y: 7, w: 1, h: 2, static: true}}>Chemistry (Lab)</div>
        <div key="h1" className={this.getClass('not Even Mon Malay')} data-grid={{x: 1, y: 9, w: 1, h: 1, static: true}}>CCE</div>
        {/* <div key="i1" className={this.getClass('Even Mon Bio')} data-grid={{x: 1, y: 11, w: 1, h: 2, static: true}}>Biology (m/u)</div> */}
        <div key="j1" className={this.getClass('not Even Mon Malay')} data-grid={{x: 1, y: 13, w: 1, h: 1, static: true}}>Higher Malay</div>

        <div key="tuT" className={this.getClass('Tuesday')} data-grid={{x: 2, y: 0, w: 1, h: 1, static: true}}>tu</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d2" data-grid={{x: 2, y: 5, w: 1, h: 1, static: true}}>dT</div>
        <div key="e2" data-grid={{x: 2, y: 6, w: 1, h: 1, static: true}}>eT</div>

        <div key="thT" data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d4" data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>dT</div>
        <div key="e4" data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>eT</div> */}
        <div key="a2" className={this.getClass('not Even Tue SS')} data-grid={{x: 2, y: 1, w: 1, h: 2, static: true}}>Social 
        Studies</div>
        <div key="b2" className={this.getClass('not Even Tue EMaths')} data-grid={{x: 2, y: 3, w: 1, h: 1, static: true}}>Mathematics</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d2" className={this.getClass('not Even Tue EMaths')} data-grid={{x: 2, y: 5, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="e2" className={this.getClass('not Even Tue Malay')} data-grid={{x: 2, y: 6, w: 1, h: 1, static: true}}>Malay</div>
        <div key="f2" className={this.getClass('not Even Tue Mon BioL')} data-grid={{x: 2, y: 7, w: 1, h: 2, static: true}}>Biology</div>
        <div key="g2" className={this.getClass('not Even Tue Makan')} data-grid={{x: 2, y: 9, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="h2" className={this.getClass('Odd Tue Bio')} data-grid={{x: 2, y: 10, w: 1, h: 2, static: true}}>Biology (m/u)</div>

        <div key="weT" className={this.getClass('Wednesday')} data-grid={{x: 3, y: 0, w: 1, h: 1, static: true}}>Wednesday</div>
        {/* <div key="a3" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}>aW</div>
        <div key="b3" data-grid={{x: 3, y: 2, w: 1, h: 1, static: true}}>bW</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d3" data-grid={{x: 3, y: 3, w: 1, h: 1, static: true}}>dW</div>
        <div key="e3" data-grid={{x: 3, y: 5, w: 1, h: 1, static: true}}>eW</div> */}
        <div key="a3" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}>aW</div>
        <div key="b3" className={this.getClass('Odd Wed AMaths')} data-grid={{x: 3, y: 2, w: 1, h: 1, static: true}}>Add Maths</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d3" className={this.getClass('Odd Wed EMaths')} data-grid={{x: 3, y: 3, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="e3" className={this.getClass('Odd Wed EMaths')} data-grid={{x: 3, y: 5, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="f3" className={this.getClass('Odd Wed Chem')} data-grid={{x: 3, y: 6, w: 1, h: 1, static: true}}>Chemistry</div>
        <div key="g3" className={this.getClass('Odd Wed Mon PE')} data-grid={{x: 3, y: 7, w: 1, h: 1, static: true}}>Physical Ed</div>
        {/* <div key="h3" className={this.getClass('Even Wed PE')} data-grid={{x: 3, y: 8, w: 1, h: 1, static: true}}>Physical Ed</div> */}
        <div key="i3" className={this.getClass('Odd Wed Makan')} data-grid={{x: 3, y: 9, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="j3" className={this.getClass('Odd Wed Malay')} data-grid={{x: 3, y: 10, w: 1, h: 1, static: true}}>Malay</div>
        <div key="k3" className={this.getClass('Odd Wed Hist')} data-grid={{x: 3, y: 11, w: 1, h: 1, static: true}}>History</div>

        <div key="thT" className={this.getClass('Thursday')} data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        {/* <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div> */}
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="a4" className={this.getClass('Odd Thu Malay')} data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>CCE</div>
        <div key="b4" className={this.getClass('Odd Thu Malay')} data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>Assembly</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d4" className={this.getClass('Odd Thu Eng')} data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>English</div>
        <div key="e4" className={this.getClass('Odd Thu Eng')} data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>English</div>
        <div key="f4" className={this.getClass('Odd Thu EMaths')} data-grid={{x: 4, y: 6, w: 1, h: 1, static: true}}>Mathematics</div>
        <div key="g4" className={this.getClass('Odd Thu Makan')} data-grid={{x: 4, y: 7, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="h4" className={this.getClass('Odd Thu PE')} data-grid={{x: 4, y: 8, w: 1, h: 2, static: true}}>Physical Ed</div>
        <div key="i4" className={this.getClass('Odd Thu AMaths')} data-grid={{x: 4, y: 10, w: 1, h: 2, static: true}}>Add Maths</div>

        <div key="frT" className={this.getClass('Friday')} data-grid={{x: 5, y: 0, w: 1, h: 1, static: true}}>Friday</div>
        <div key="a5" className={this.getClass('Odd Fri Eng')} data-grid={{x: 5, y: 1, w: 1, h: 2, static: true}}>English</div>
        <div key="b5" className={this.getClass('Odd Fri Hist')} data-grid={{x: 5, y: 3, w: 1, h: 1, static: true}}>History</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d5" className={this.getClass('Odd Fri SS')} data-grid={{x: 5, y: 5, w: 1, h: 1, static: true}}>Social Studies</div>
        <div key="e5" className={this.getClass('Odd Fri Makan')} data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>LUNCH</div>
        <div key="f5" className={this.getClass('Odd Fri Chem')} data-grid={{x: 5, y: 7, w: 1, h: 1, static: true}}>Chemistry</div>
        <div key="g5" className={this.getClass('Odd Fri Bio')} data-grid={{x: 5, y: 8, w: 1, h: 1, static: true}}>Biology</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        {/* <div key="d5" className={this.getClass('Odd Fri Eng')} data-grid={{x: 5, y: 6, w: 1, h: 1, static: true}}>English</div>
        <div key="e5" className={this.getClass('Odd Fri Chem')} data-grid={{x: 5, y: 7, w: 1, h: 2, static: true}}>Chemistry</div> */}

        <div key="az" className={this.getTimeClass('0750')} data-grid={{x: 6, y: 1, w: 1, h: 1, static: true}}>7:50am</div>
        <div key="bz" className={this.getTimeClass('0830')} data-grid={{x: 6, y: 2, w: 1, h: 1, static: true}}>8:30am</div>
        <div key="cz" className={this.getTimeClass('0910')} data-grid={{x: 6, y: 3, w: 1, h: 1, static: true}}>9:10am</div>
        <div key="dz" className={this.getTimeClass('0950')} data-grid={{x: 6, y: 4, w: 1, h: 1, static: true}}>9:50am</div>
        <div key="ez" className={this.getTimeClass('1000')} data-grid={{x: 6, y: 5, w: 1, h: 1, static: true}}>10:00am</div>
        <div key="fz" className={this.getTimeClass('1040')} data-grid={{x: 6, y: 6, w: 1, h: 1, static: true}}>10:40am</div>
        <div key="gz" className={this.getTimeClass('1120')} data-grid={{x: 6, y: 7, w: 1, h: 1, static: true}}>11:20am</div>
        <div key="hz" className={this.getTimeClass('1200')} data-grid={{x: 6, y: 8, w: 1, h: 1, static: true}}>12:00nn</div>
        <div key="iz" className={this.getTimeClass('1240')} data-grid={{x: 6, y: 9, w: 1, h: 1, static: true}}>12:40pm</div>
        <div key="jz" className={this.getTimeClass('1320')} data-grid={{x: 6, y: 10, w: 1, h: 1, static: true}}>1:20pm</div>
        <div key="kz" className={this.getTimeClass('1400')} data-grid={{x: 6, y: 11, w: 1, h: 1, static: true}}>2:00pm</div>
        <div key="lz" className={this.getTimeClass('1440')} data-grid={{x: 6, y: 12, w: 1, h: 1, static: true}}>2:40pm</div>
        <div key="mz" className={this.getTimeClass('1500')} data-grid={{x: 6, y: 13, w: 1, h: 1, static: true}}>3:00pm</div>
        {/* <div key="nz" className={this.getTimeClass('1600')} data-grid={{x: 6, y: 13, w: 1, h: 1, static: true}}>3:00pm</div> */}
        <div key="nz" className={this.getTimeClass('1600')} data-grid={{x: 6, y: 14, w: 1, h: 1, static: true}}>4:00pm</div>
      </ReactGridLayout>
      </div>    )
  }
}

// export default MyFirstGrid;
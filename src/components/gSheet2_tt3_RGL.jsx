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
    return (
      <div style={{transform: 'scale(0.75) translate(-10%, -10%)'}}>
      <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
        <div key="0T" data-grid={{x: 0, y: 0, w: 1, h: 1, static: true}}>T</div>
        <div key="a" data-grid={{x: 0, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b" data-grid={{x: 0, y: 2, w: 1, h: 1, static: true}}>bT</div>
        <div key="c" data-grid={{x: 0, y: 3, w: 1, h: 1, static: true}}>cT</div>
        <div key="d" data-grid={{x: 0, y: 4, w: 1, h: 1, static: true}}>dT</div>
        <div key="e" data-grid={{x: 0, y: 5, w: 1, h: 1, static: true}}>eT</div>
        <div key="f" data-grid={{x: 0, y: 6, w: 1, h: 1, static: true}}>fT</div>
        <div key="g" data-grid={{x: 0, y: 7, w: 1, h: 1, static: true}}>gT</div>
        <div key="h" data-grid={{x: 0, y: 8, w: 1, h: 1, static: true}}>hT</div>
        <div key="i" data-grid={{x: 0, y: 9, w: 1, h: 1, static: true}}>iT</div>
        <div key="j" data-grid={{x: 0, y: 10, w: 1, h: 1, static: true}}>jT</div>

        <div key="moT" data-grid={{x: 1, y: 0, w: 1, h: 1, static: true}}>mo</div>
        <div key="a1" className="s1" data-grid={{x: 1, y: 1, w: 1, h: 1, static: true}}>aM</div>
        <div key="b1" data-grid={{x: 1, y: 2, w: 1, h: 2, static: true}}>bM</div>
        <div key="c1" data-grid={{x: 1, y: 4, w: 5, h: 1, static: true}}>cM</div>
        <div key="d1" data-grid={{x: 1, y: 5, w: 1, h: 1, static: true}}>dM</div>
        <div key="e1" data-grid={{x: 1, y: 6, w: 1, h: 1, static: true}}>eM</div>

        <div key="tuT" data-grid={{x: 2, y: 0, w: 1, h: 1, static: true}}>tu</div>
        <div key="a2" data-grid={{x: 2, y: 1, w: 1, h: 2, static: true}}>aT</div>
        <div key="b2" data-grid={{x: 2, y: 3, w: 1, h: 1, static: true}}>bT</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d2" data-grid={{x: 2, y: 5, w: 1, h: 1, static: true}}>dT</div>
        <div key="e2" data-grid={{x: 2, y: 6, w: 1, h: 1, static: true}}>eT</div>

        <div key="weT" data-grid={{x: 3, y: 0, w: 1, h: 1, static: true}}>we</div>
        <div key="a3" data-grid={{x: 3, y: 1, w: 1, h: 1, static: true}}>aW</div>
        <div key="b3" data-grid={{x: 3, y: 2, w: 1, h: 1, static: true}}>bW</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d3" data-grid={{x: 3, y: 3, w: 1, h: 1, static: true}}>dW</div>
        <div key="e3" data-grid={{x: 3, y: 5, w: 1, h: 1, static: true}}>eW</div>

        <div key="thT" data-grid={{x: 4, y: 0, w: 1, h: 1, static: true}}>th</div>
        <div key="a4" data-grid={{x: 4, y: 1, w: 1, h: 1, static: true}}>aT</div>
        <div key="b4" data-grid={{x: 4, y: 2, w: 1, h: 1, static: true}}>bT</div>
        {/* <div key="c2" data-grid={{x: 2, y: 3, w: 5, h: 1, static: true}}>c</div> */}
        <div key="d4" data-grid={{x: 4, y: 3, w: 1, h: 1, static: true}}>dT</div>
        <div key="e4" data-grid={{x: 4, y: 5, w: 1, h: 1, static: true}}>eT</div>

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
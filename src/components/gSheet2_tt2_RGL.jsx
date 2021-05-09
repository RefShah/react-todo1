import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";

// moving the css here did it
import "../css/styles.css";
import "../css/example-styles.css";

import ScaleText from "react-scale-text";

const ReactGridLayout = WidthProvider(RGL);

export default class NoDraggingLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    isDraggable: false,
    isResizable: false,
    items: 20,
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);

    const layout = this.generateLayout();
    this.state = { layout };
  }

  generateDOM() {
    return _.map(_.range(this.props.items), function(i) {
      return (
        <div key={i}>
                      <div className="subj2 parent" style={{ width: "100px", height: "50px" }}>
                      <ScaleText maxFontSize={20}>
                      {/* <div className={sClass}>{obj.A1}</div> */}
                      <span className="child text">{i}</span>
                      </ScaleText>
                      </div>
        </div>
      );
    });
  }

  generateLayout() {
    console.log('0: ', this);
    const p = this.props;
    // console.log('1: ', p.items); 
    return _.map(new Array(p.items), function(item, i) {
      var y = _.result(p, "y") || Math.ceil(Math.random() * 4) + 1;
      // var y = _.result(p, "y") || 1;
      console.log('1: ', y); 
      return {
        x: (i * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        // i: ("aaaaa" + i).slice(-5)
        t: "abc"
      };
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        {...this.props}
      >
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}

if (process.env.STATIC_EXAMPLES === true) {
  import("../test-hook.jsx").then(fn => fn.default(NoDraggingLayout));
}

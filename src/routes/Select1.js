import React, { Component } from 'react';
import { render } from 'react-dom';

class Select1 extends Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.numberComponent = React.createRef();
  }

  render() {
    console.log(this.inputBox);
    console.log(this.numberComponent);
    return (
      <div>
        <input />
        <hr />
        <input ref={this.inputBox} />
        <hr />
        <Number number={1} ref={this.numberComponent} />
      </div>
    );
  }
}

class Number extends Component {
  render() {
    return <div>{this.props.number}</div>;
  }
}

render(<Select1 />, document.getElementById('root'));

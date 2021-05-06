//import React from "react";
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class PostIt1 extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef();
    this.state = { text: 'Initial' };
  }
    state = {  }
  render() { 
    return (  <div>        <textarea
      ref={this.editor}
      value={this.state.text}
      onChange={e => this.setState({ text: e.target.value })}
    />
            <button
          onClick={() => {
            const textareaElem = this.editor.current;
            const selectionStart = textareaElem.selectionStart;
            const selectionEnd = textareaElem.selectionEnd;
            if (selectionStart === selectionEnd) {
              // no selection, just concat
              this.setState({ text: this.state.text + 'Hello World' });
            } else {
              this.setState({
                text:
                  this.state.text.slice(0, selectionStart) +
                  'Hello World' +
                  this.state.text.slice(selectionEnd)
              });
              alert('A name was submitted: ' + this.state.text.slice(selectionStart, selectionEnd));
            }
            textareaElem.focus();
          }}
        >
          Insert
        </button>
        <button>Populate</button>

</div>);
  }
}
 
export default PostIt1;
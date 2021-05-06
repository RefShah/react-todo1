import React, { Component } from "react";
import TodoItems from "./ToDo1Items";
 
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef(); // this is crucial for the selection func
    this.state = {
      themes: [],
      text: 'Initial4'
    };
    this.extractSelection = this.extractSelection.bind(this);
  }
   
  extractSelection(e) {
    const textareaElem = this.editor.current;
    const selectionStart = textareaElem.selectionStart;
    const selectionEnd = textareaElem.selectionEnd;
    if (selectionStart === selectionEnd) {
      // no selection, just concat
      this.setState({ text: this.state.text + 'Hello World' });
    } else {
      // this.setState({
      //   text:
      //     this.state.text.slice(0, selectionStart) +
      //     'Hello World' +
      //     this.state.text.slice(selectionEnd)
      // });
      // alert('A name was submitted: ' + this.state.text.slice(selectionStart, selectionEnd));
      var newItem = {
        text: this.state.text.slice(selectionStart, selectionEnd),
        key: Date.now()
      };
      this.setState((prevState) => {
        return { 
          themes: prevState.themes.concat(newItem) 
        };
      });
  }
    textareaElem.focus();

    // if (this._inputElement.value !== "") {
    //   var newItem = {
    //     text: this._inputElement.value,
    //     key: Date.now()
    //   };
   
    //   this.setState((prevState) => {
    //     return { 
    //       themes: prevState.themes.concat(newItem) 
    //     };
    //   });
     
    //   this._inputElement.value = "";
    // }
     
    console.log(this.state.themes);
       
    e.preventDefault();  }
  
  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.extractSelection}>
          {/* <textarea ref={(a) => this._inputElement = a} */}
            <textarea 
              ref={this.editor}
              value={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
              placeholder="enter task">
            </textarea>
            <button type="submit">add1</button>
          </form>
        </div>
        <TodoItems entries={this.state.themes}/>
      </div>
    );
  }
}
 
export default TodoList;
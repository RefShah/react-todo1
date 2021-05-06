import React, { Component } from "react";
import TodoItems from "./ToDo1Items";
import Todo2Items from "./ToDo2Items";
import Tabletop from 'tabletop';
 
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.editor = React.createRef(); // this is crucial for the selection func
    this.state = {
      data: [],
      themes: [],
      text: 'Initial3'
    };
    this.extractSelection = this.extractSelection.bind(this);
  }
   
  componentDidMount() {
    Tabletop.init({
      key: '1MmHjfOgvAPvFk8pe2UOciV0vIMxBt7EBa94kyHNHCO0',
      callback: googleData => {
        this.setState({
          data: googleData,
          text: googleData[0].A1
        })
      },
      simpleSheet: true
    })
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
  
    //method called from Todo component
    handleDelete = todo => {
      const themes = this.state.themes.filter((t) => {
          return t.key !== todo
      });
      this.setState({ themes }); // delete prob solved by using themes here n in const name instead of todos
      // console.log(this.state.themes);
      // console.log(todo);
  }

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
            <button type="submit">add2</button>
          </form>
        </div>
        <table className="tableTD2">
                <tbody>
                    {this.state.themes.map((theme, index) => (
                        <tr key={theme.key}>
                            <Todo2Items todo={theme} fooDelete={this.handleDelete} fooDoneDone={this.handleDone} />
                        </tr>
                    ))}
                </tbody>
            </table>
      </div>
    );
  }
}
 
export default TodoList;
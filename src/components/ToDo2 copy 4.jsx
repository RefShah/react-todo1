import React, { Component } from "react";
import TodoItems from "./ToDo1Items";
import Todo2Items from "./ToDo2Items";
import Tabletop from 'tabletop';
import firebase from '@firebase/app';
// import * as firebase from 'firebase/database';
import 'firebase/database';
import { DB_CONFIG } from '../cfg/config';
import Note from './ToDo2Note';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    // this.app = firebase.initializeApp(DB_CONFIG);
    // this.database = this.app.database().ref().child('themes');
    this.database = firebase.database().ref().child('themes');

    this.editor = React.createRef(); // this is crucial for the selection func
    this.state = {
      data: [],
      themes: [],
      text: 'Initial3',
      height: 100
    };
    this.extractSelection = this.extractSelection.bind(this);
  }
   
  componentDidMount() {
    const dbRef = firebase.database().ref().child('postIt');
    const dbRef2 = firebase.database().ref().child('themes');
    const previousNotes = this.state.themes;

    console.log('A2', this);
    // DataSnapshot
    dbRef2.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        text: snap.val().text,
      })

      this.setState({
        themes: previousNotes
      })
    })

    dbRef2.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        themes: previousNotes
      })
    })

    // dbRef.on('value', data => (
    //   DataDisplay.innerText = data.val()
    //   ));
	  dbRef.on('value', snap => {
      this.setState({
        text: snap.val()
      })
    });
    // Tabletop.init({
    //   key: '1MmHjfOgvAPvFk8pe2UOciV0vIMxBt7EBa94kyHNHCO0',
    //   callback: googleData => {
    //     this.setState({
    //       data: googleData,
    //       text: googleData[0].A1
    //     })
    //   },
    //   simpleSheet: true
    // })
  }

  addNote(note){
    console.log('A1', this);
    this.database.push().set({ text: note});
  }

  removeNote(noteId){
    console.log("from the parent1: " + noteId);
    this.database.child(noteId).remove();
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
      // this.props.addNote(this.state.newNoteContent);
      this.addNote(this.state.text.slice(selectionStart, selectionEnd));
      // this.setState((prevState) => {
      //   return { 
      //     themes: prevState.themes.concat(newItem) 
      //   };
      // });
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
       
    e.preventDefault();  
  }
  
    //method called from Todo component
    handleDelete = todo => {
      const themes = this.state.themes.filter((t) => {
          return t.key !== todo
      });
      this.setState({ themes }); // delete prob solved by using themes here n in const name instead of todos
      // console.log(this.state.themes);
      // console.log(todo);

    }

    changeTextareaHandler = () => {
      // console.log('A3', this);
      const elemHeight = this.editor.current.scrollHeight;
      this.setState({ height: elemHeight });
    };
  
render() {
    return (
      <div className="todoListMain">
        <Container className="mainContainer">
          <Row>
            <Col className="leftCol">
              <div className="header notesBody">
                <form className="postIt" onSubmit={this.extractSelection}>
                {/* <textarea ref={(a) => this._inputElement = a} */}
                  <div>
                    <textarea className="addBtn postIt" 
                      // style={{ height: this.state.height, padding: 0 }}
                      style={{ height: this.state.height, padding: 0 }}
                      ref={this.editor}
                      value={this.state.text}
                      onMouseOver={this.changeTextareaHandler}
                      // onChange={e => this.setState({ text: e.target.value })}
                      placeholder="enter task">
                    </textarea>
                  </div>
                  <button className="addBtn" type="submit">add2</button>
                </form>
              </div>
            </Col>
            <Col>
            <div className="notesBody">
              {this.state.themes.map((note) => {
                return (
                  <Note text={note.text} 
                  noteId={note.id} 
                  key={note.id} 
                  removeNote ={this.removeNote}/>
                )
              })}
            </div>      
            </Col>
          </Row>
        </Container>
        {/* <table className="tableTD2">
                <tbody>
                    {this.state.themes.map((theme, index) => (
                        <tr key={theme.key}>
                            <Todo2Items todo={theme} newDelete={this.removeNote(index)} fooDelete={this.handleDelete} fooDoneDone={this.handleDone} />
                        </tr>
                    ))}
                </tbody>
            </table> */}
        </div>
    );
  }
}
 
export default TodoList;
import React, { Component } from "react";
import TodoItems from "./ToDo1Items";
import Todo2Items from "./ToDo2Items";
import Tabletop from 'tabletop';
import firebase from '@firebase/app';
// import * as firebase from 'firebase/database';
import 'firebase/database';
import { DB_CONFIG } from '../cfg/config';
import Note from './ToDo2Note';
import TodoList from './ToDo2';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Todo3 extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    // this.app = firebase.initializeApp(DB_CONFIG);
    // this.database = this.app.database().ref().child('themes');
    this.database = firebase.database().ref().child('squares');

    // this.editor = React.createRef(); // this is crucial for the selection func
    this.state = {
      // data: [],
      postIts: [],
      text: 'Initial3',
      height: 100
    };
    // this.extractSelection = this.extractSelection.bind(this);
  }
   
  componentDidMount() {
    // const dbRef = firebase.database().ref().child('postIt');
    const dbRef2 = firebase.database().ref().child('squares');
    const previousNotes = this.state.postIts;

    console.log('B2', this);
    // DataSnapshot
    dbRef2.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
      })

      this.setState({
        postIts: previousNotes
      })
    })

    dbRef2.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        postIts: previousNotes
      })
    })

    // dbRef.on('value', data => (
    //   DataDisplay.innerText = data.val()
    //   ));
	  dbRef.on('value', snap => {
      this.setState({
        postIts: snap.val()
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
    console.log('B1', this);
    // this.database.push().set({ text: note});
    this.database.push().set({ noteContent: note});
  }

  removeNote(noteId){
    console.log("from the parent1: " + noteId);
    this.database.child(noteId).remove();
  }

  //method called from Todo component
  handleDelete = todo => {
    const themes = this.state.postIts.filter((t) => {
        return t.key !== todo
    });
    this.setState({ postIts }); // delete prob solved by using themes here n in const name instead of todos
    // console.log(this.state.themes);
    // console.log(todo);

  }

  // changeTextareaHandler = () => {
  //   // console.log('A3', this);
  //   const elemHeight = this.editor.current.scrollHeight;
  //   this.setState({ height: elemHeight });
  // };
  
render() {
    return (
      <div className="todoListMainA">
        <Container className="mainContainerA">
          <Row>
            <Col>
            <div>
            {this.state.postIts.map((square) => {
                return (
                  <TodoList text={square.text} 
                  noteId={square.id} 
                  key={square.id} 
                  removeNote ={this.removeNote}/>
                )
              })}
            </div>
            <div className="notesFooter">
              <NoteForm addNote={this.addNote} />
            </div>
            {/* <div className="header notesBody">
            </div> */}
            </Col>
            {/* <Col>
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
            </Col> */}
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
 
export default Todo3;
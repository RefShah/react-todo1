import React, { Component } from "react";
import TodoItems from "./ToDo1Items";
import Todo2Items from "./ToDo2Items";
import Todo2 from "./ToDo2";
import Tabletop from 'tabletop';
import firebase from '@firebase/app';
// import * as firebase from 'firebase/database'; 
import 'firebase/database';
import { DB_CONFIG } from '../cfg/config';
import Note from './ToDo2Note';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PieceEntry from './PieceEntry';
import PieceNote from './PieceNote';

class PieceForm extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    // this.removeTheme = this.removeTheme.bind(this);

    // this.app = firebase.initializeApp(DB_CONFIG);
    // this.database = this.app.database().ref().child('themes');
    this.database = firebase.database().ref().child('notes');
    this.db2 = firebase.database().ref().child('notes').child('themes');

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
      themes: []
    }
  }
   
  componentDidMount() {
    const dbRef = firebase.database().ref().child('postIt');
    const dbRef2 = firebase.database().ref().child('themes');
    const previousNotes = this.state.notes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
        themes: snap.val().themesA,
      })
      // console.log('Add', snap)

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          previousNotes.splice(i, 1);
        }
      }

      this.setState({
        notes: previousNotes
      })
    })
  }

  addNote(note){
    const themesC = this.state.themes;
    const dbRef2 = firebase.database().ref().child('themes');
    // this.database.push
    this.database.push().set({ 
      noteContent: note,
      // this.db2.push().set({ 
      //   themesB: note
      // }),
        themesA: [note+'0', note+'1']
    });
    console.log(this);
  }

  removeNote(noteId, key){
    console.log("from the parent: " + noteId, ' ', key);
    // this.database.child(noteId).remove();
  }
  
render() {
    return (
      <div className="todoListMain">
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="notesFooter">
          <PieceEntry fooaddNote={this.addNote} />
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <div>
                  {/* <Todo2 noteContent={note.noteContent} 
                  noteId={note.id} 
                  key={note.id} 
                  removeNote ={this.removeNote}/> */}
                  <PieceNote noteContent={note.noteContent} 
                  t0={note.themes[0]}
                  themes={note.themes}
                  noteId={note.id} 
                  key={note.id} 
                  removeNote ={this.removeNote}/>
                </div>
              )
            })
          }
        </div>
        </div>
    );
  }
}
 
export default PieceForm;
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
import PieceEntry from './PieceEntry';
import PieceNote from './PieceNote';

class PieceForm extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);

    // this.app = firebase.initializeApp(DB_CONFIG);
    // this.database = this.app.database().ref().child('themes');
    this.database = firebase.database().ref().child('notes');

    // We're going to setup the React state of our component
    this.state = {
      notes: [],
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
        noteContent2: snap.val().noteContent,
      })

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
    this.database.push().set({ 
      noteContent: note,
      noteContent2: note
    });
  }

  removeNote(noteId){
    console.log("from the parent: " + noteId);
    this.database.child(noteId).remove();
  }
  
render() {
    return (
      <div className="todoListMain">
        <div className="notesHeader">
          <div className="heading">React & Firebase To-Do List</div>
        </div>
        <div className="notesFooter">
          <PieceEntry addNote={this.addNote} />
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <PieceNote noteContent={note.noteContent} 
                noteId={note.id} 
                key={note.id} 
                removeNote ={this.removeNote}/>
              )
            })
          }
        </div>
        </div>
    );
  }
}
 
export default PieceForm;
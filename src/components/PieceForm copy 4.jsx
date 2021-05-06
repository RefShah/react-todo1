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
    this.db2 = firebase.database().ref().child('notes').child('themesA');

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

    this.database.on('child_changed', snap => {
      // previousNotes.push({
      //   id: snap.key,
      //   noteContent: snap.val().noteContent,
      //   themes: snap.val().themesA,
      // })
      console.log('FChg', snap.key);
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          console.log('FthemesC1: ', snap.val().themesA);
          previousNotes[i].themes = snap.val().themesA;
        }
      }
      console.log('Fin chg, this: ', this);

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
    const previousNotes = this.state.notes;
    const dbRef3 = firebase.database().ref().child('notes');
    var flag = 0;

    console.log("from the parent: " + noteId, ' ', key);
    console.log(this.database.child(noteId).themesA);
    console.log(this.db2.child(key));
    // this.database.child(noteId).remove(); // this works to del the entire note
    // this.db2.child(key).remove(); // didnt work, even after changing db2 path to themesA
    // this.database.child(noteId).child(userId).get().then(function(snapshot) {
    //   if (snapshot.exists()) {
    //     console.log(snapshot.val());
    //   }
    //   else {
    //     console.log("No data available");
    //   }
    // }).catch(function(error) {
    //   console.error(error);
    // });
    dbRef3.child(noteId).on('value', (snapshot) => {
      const data = snapshot.val();
      // updateStarCount(postElement, data);
      console.log('this inside: ', this);
      console.log('insnap: ', snapshot.val(), 'flag: ', flag);
      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snapshot.key){
          console.log('themesC: ', previousNotes[i].themes);
          const currThemes = [...snapshot.val().themesA];
          console.log('currThemes: ', currThemes);
          currThemes.splice(key, 1);
          console.log('currThemes: ', currThemes);
          // previousNotes.splice(i, 1);
          // a thought occurs: with >1 clients, will state be enough
          // to get the current state to use to upd db?
          // dbRef3.child(noteId).update({
          //   themesA: currThemes
          // }); 
          dbRef3.child(noteId).on('value', (insnap) => {
            const data = insnap.val();
            // updateStarCount(postElement, data);
            this.setState({
              notes: insnap.val()
            })
          });
          // console.log('flag os1: ', flag);
          // dbRef3.child(noteId).get().then(function(insnap) {
          //   if (insnap.exists()) {
          //     // flag = 1;
          //     // console.log('this inside: ', this);
          //     console.log('insnap: ', insnap.val(), 'flag: ', flag);
          //   }
          //   else {
          //     console.log("No data available");
          //   }
          // }).catch(function(error) {
          //   console.error(error);
          // });
          // console.log('flag os2: ', flag);
        }
      }
    });
    this.database.child(noteId).get().then(function(snapshot) {
      if (snapshot.exists()) {
        // console.log(snapshot.val());
        // console.log('Key: ', snapshot.key);
        // console.log('themesA[0]: ', snapshot.val().themesA[key]);
        // console.log('notes: ', previousNotes);
        // for(var i=0; i < previousNotes.length; i++){
        //   if(previousNotes[i].id === snapshot.key){
        //     console.log('themesC: ', previousNotes[i].themes);
        //     const currThemes = [...snapshot.val().themesA];
        //     console.log('currThemes: ', currThemes);
        //     currThemes.splice(key, 1);
        //     console.log('currThemes: ', currThemes);
        //     // previousNotes.splice(i, 1);
        //     // a thought occurs: with >1 clients, will state be enough
        //     // to get the current state to use to upd db?
        //     // dbRef3.child(noteId).update({
        //     //   themesA: currThemes
        //     // }); // this works to del the entire note
        //     // console.log('flag os1: ', flag);
        //     // dbRef3.child(noteId).get().then(function(insnap) {
        //     //   if (insnap.exists()) {
        //     //     // flag = 1;
        //     //     // console.log('this inside: ', this);
        //     //     console.log('insnap: ', insnap.val(), 'flag: ', flag);
        //     //   }
        //     //   else {
        //     //     console.log("No data available");
        //     //   }
        //     // }).catch(function(error) {
        //     //   console.error(error);
        //     // });
        //     // console.log('flag os2: ', flag);
        //         // this.setState({
        //         //   notes: insnap.val()
        //         // })
        //   }
        // }
      }
      else {
        console.log("No data available");
      }
    }).catch(function(error) {
      console.error(error);
    });
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
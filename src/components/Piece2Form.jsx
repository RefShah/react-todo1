import React, { Component } from "react";
import TodoItems from "./ToDo1Items";
import Todo2Items from "./ToDo2Items";
import Todo2 from "./ToDo2";
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
import Piece2Note from './Piece2Note';

class PieceForm extends Component {
  constructor(props) {
    super(props);
    this.addNote = this.addNote.bind(this);
    this.removeNote = this.removeNote.bind(this);
    // this.removeTheme = this.removeTheme.bind(this);

    // this.app = firebase.initializeApp(DB_CONFIG);
    // this.database = this.app.database().ref().child('themes');
    this.database = firebase.database().ref().child('notes2');
    this.db2 = firebase.database().ref().child('notes2').child('themes');

    // We're going to setup the React state of our component
    this.state = {
      notes: []
    }
  }
   
  componentDidMount() {
    // const dbRef = firebase.database().ref().child('postIt');
    // const dbRef2 = firebase.database().ref().child('themes');
    const previousNotes = this.state.notes;

    // DataSnapshot
    // console.log('P2F, b4 _add, this.database: ', this.database);
    // console.log('P2F, b4 _add, this.db2: ', this.db2);
    // console.log('P2F, b4 _add, this.database.child(this.noteId): ', this.database.child(this.noteId));
    this.database.on('child_added', snap => {
      previousNotes.push({
        id: snap.key,
        noteContent: snap.val().noteContent,
        themes: snap.val().themesA,
      })
      // console.log('Add0', snap);
      // abv appears for each Note (DataSnapshot) on load

      console.log('Add1', snap.val());
      // abv appears for each Note (content of branch, i.e nCont & themesA) on load
      // and is the final clog to appear on load

      // this.database.child(this.noteId).push().set({ theme: this.noteContent.slice(selectionStart, selectionEnd)});
      // this.database.child(this.noteId).get().then(function(snapshot) {
      //   if (snapshot.exists()) {
      //     console.log(snapshot.val());
      //   }
      //   else {
      //     console.log("No data available");
      //   }
      // }).catch(function(error) {
      //   console.error(error);
      // });

      this.setState({
        notes: previousNotes
      })
    })

    this.database.on('child_changed', snap => {
      console.log('prevNotes0: ', previousNotes);
      // previousNotes.push({
      //   id: snap.key,
      //   noteContent: snap.val().noteContent,
      //   themes: snap.val().themesA,
      // })
      console.log('FChg', snap.key);
      // console.log('FthemesC0: ', snap.val().themesA);
      // as of 1504am, 17th to appear upon Trash, giving the key in qn
      // after NinC, appears again as 24th (2nd of 4th)
      // after themeC, appears again as 34th (3rd of 4th)
      // after NinC, appears again as 41st (4th of 4th)
      // this is the 1st msg to start repeating
      // wondering if due to ch.chg listening at top level
      // as of 1604am, now 18th to appear upon Trash, giving the key in qn
        // but this time appears only 2x in total

      for(var i=0; i < previousNotes.length; i++){
        if(previousNotes[i].id === snap.key){
          console.log('FthemesC1: ', snap.val().themesA);
          // as of 1504am, 18th to appear upon Trash, giving arr less 1
          // appears again as 25th (2nd of 4th)
          // appears again as 35th (3rd of 4th), but now undef
          // appears again as 42nd (4th of 4th), again undef
          // upon analysis, a further 3x could be due to 3 notes in total?
          // as of 1604am, now 19th to appear upon Trash, giving arr less 1
            // but this time appears only 2x in total
            // the 2nd time undef

          previousNotes[i].themes = snap.val().themesA;
        }
      }
      console.log('prevNotes1: ', previousNotes);
      // console.log('Fin chg, this: ', this);
      // as of 1504am, 19th to appear upon Trash
      // this is a PForm with .state.notes being the array of notes
      // and as of 1504am i.e err, whose branch in qn, themes is undef
      // next is NChg (PNote.jsx)
      // appears again as 26th (2nd of 4th)
      // appears again as 36th (3rd of 4th)
      // appears again as 43rd (4th of 4th)
      // commenting this out on 1604am

      this.setState({
        notes: previousNotes
      })
      console.log('state.notes: ', this.state.notes);
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
    // const themesC = this.state.themes;
    // const dbRef2 = firebase.database().ref().child('themes');
    // this.database.push
    this.database.push().set({ 
      noteContent: note,
      // this.db2.push().set({ 
      //   themesB: note
      // }),
        themesA: [note+' ABC DEF 0', note+' ABC DEF 1', note+' ABC DEF 2']
    });
    console.log('addNote: ', this);
    // abv is last to appear upon Add Note, shows the PForm ....
    // whose .state.notes is the array of Notes
  }

  removeNote(noteId, key){
    const previousNotes = this.state.notes;
    const dbRef3 = firebase.database().ref().child('notes2');
    var flag = 0;

    console.log("from the parent: " + noteId, ' ', key);
    // as of 1504am, 5th to appear upon Trash
    // giving snap.key followed by array idx
    // as of P2 (1604nn), key returns undef

    // new as of P2
    console.log('in P2F, rNote, this: ', this);
    // as of P2, this returns PForm with state.notes arr of n notes
      // so next gonna rem fr db 

    // console.log(this.database.child(noteId).themesA);
    // as of 1504am, 6th to appear upon Trash
    // giving undef as of 1504am
    // commenting this out on the onset of P2F cos atm no themes

    // console.log(this.db2.child(key));
    // as of 1504am, 7th to appear upon Trash
    // giving Reference, with path.pieces is arr(3) vals being "notes", "themesA", "0"
    // and is confusing so shd ignore (for now)
    // commenting this out on the onset of P2F cos atm no themes

    // below is the code to remove Note
    this.database.child(noteId).remove(); // this works to del the entire note

    // commenting out the whole .on on the onset
    // dbRef3.child(noteId).on('value', (snapshot) => {
    //   const data = snapshot.val();
    //   // updateStarCount(postElement, data);
    //   console.log('this inside: ', this);
    //   // as of 1504am, 8th to appear upon Trash
    //   // this is a PForm with .state.notes being the array of notes
    //   // and as of 1504am i.e err, whose branch in qn, themes is undef
    //   // appears again as 31st, also undef
    //   // as of 1604am, remains 8th to appear upon Trash
    //     // but looking further, it now appears 3x in total
    //     // and in this repeated set, currT showing arr len 2 and 1
    //     // then 1 and 0, then totally absent

    //   // at this pt, 1504am, wanna note that elem in state.notes is ...
    //   // id, nCont and themes, but in fb, is ...
    //   // nCont and themesA

    //   for(var i=0; i < previousNotes.length; i++){
    //     if(previousNotes[i].id === snapshot.key){
    //       console.log('themesC: ', previousNotes[i].themes);
    //       // as of 1504am, 9th to appear upon Trash
    //       // curr state themes i.e before del
    //       // appears again as 33rd, but this time themes is less 1
    //         // and is not followed by currT below but FChg instead

    //       const currThemes = [...snapshot.val().themesA];
    //       console.log('currThemes: ', currThemes);
    //       // as of 1504am, 10th to appear upon Trash
    //       // curr db themes i.e before del

    //       currThemes.splice(key, 1);
    //       console.log('currThemes: ', currThemes);
    //       // as of 1504am, 11th to appear upon Trash
    //       // cp of curr db themes after del
    //       // as of 1504am, upon Trash, what appears next is a 2nd "this inside"
    //         // thus 12th, and appears to be identical to the 1st
    //         // and wnat follows are similarly insnap, themesC and 2x currTh
    //         // thus 13th-16th, but these are diff fr the 1st instance
    //         // insnap contains arr less 1 elem,
    //         // themesC is still bef del
    //         // but 1st currT is aft del
    //         // and 2nd currT is less _2_ elems
    //           // which seems to indicate a double del!!!
    //         // and next is FChg

    //       // previousNotes.splice(i, 1);
    //       // a thought occurs: with >1 clients, will state be enough
    //       // to get the current state to use to upd db?
    //       dbRef3.child(noteId).update({
    //         themesA: currThemes
    //       }); 

    //       dbRef3.child(noteId).on('value', (insnap) => {
    //         const data = insnap.val();
    //         console.log('value snap:', data);
    //         // as of 1504am, NOT the 12th to appear upon Trash
    //         // perhaps cos .update above kicked in first
    //         // in fact, it appears after the very last NinC
    //         // appears 2x and followed by errors (TypeErr)

    //         // updateStarCount(postElement, data);
    //         // // this below causes err 'this.state.notes.map is not a func'
    //         // this.setState({
    //         //   notes: insnap.val()
    //         // })
    //       });

    //       // console.log('flag os1: ', flag);
    //       // dbRef3.child(noteId).get().then(function(insnap) {
    //       //   if (insnap.exists()) {
    //       //     // flag = 1;
    //       //     // console.log('this inside: ', this);
    //       //     console.log('insnap: ', insnap.val(), 'flag: ', flag);
    //       //   }
    //       //   else {
    //       //     console.log("No data available");
    //       //   }
    //       // }).catch(function(error) {
    //       //   console.error(error);
    //       // });
    //       // console.log('flag os2: ', flag);
    //     }
    //   }
    // });

  }
  
render() {
    return (
      <div className="todoListMain">
        <div className="notesHeader">
          <div className="heading">&lt;Title&gt;</div>
        </div>
        <div className="notesFooter">
          <PieceEntry className="formWrapper" fooaddNote={this.addNote} />
        </div>
        <div className="notesBody">
          {
            this.state.notes.map((note) => {
              return (
                <Piece2Note noteContent={note.noteContent} 
                themes={note.themes}
                noteId={note.id} 
                key={note.id} 
                fooremoveNote={this.removeNote}/>
              )
            })
          }
        </div>
      </div> /* <!-- #className="todoListMain" --> */
    );
  }
}
 
export default PieceForm;
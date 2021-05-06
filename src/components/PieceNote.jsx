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
import PropTypes from 'prop-types';

class PieceNote extends Component {
  constructor(props) {
    super(props);
    this.noteContent = props.noteContent; 
    this.noteId = props.noteId; 
    this.handleRemoveNote = this.handleRemoveNote.bind(this);
    this.removeTheme = this.removeTheme.bind(this);
    this.state = {
      themes: [],
      text: 'Initial'
    }
  }
   
  componentDidMount() {
    const dbRef = firebase.database().ref().child('postIt');
    const dbRef2 = firebase.database().ref().child('themes');
    const dbRef3 = firebase.database().ref().child('notes');
    const dbRef4 = firebase.database().ref().child('notes/themesA');
    // const previousNotes = this.state.themes;
    const previousNotes = this.props.themes;
    const previousText = this.state.text;

    // console.log('A2', this); // will output for every Note
    // DataSnapshot
    // dbRef2.on('child_added', snap => {
    //   previousNotes.push({
    //     id: snap.key,
    //     text: snap.val().text,
    //   })

    //   this.setState({
    //     themes: previousNotes
    //   })
    // })

    dbRef3.on('child_changed', snap => { // runs for each Note
      // previousNotes.push({
      //   id: snap.key,
      //   noteContent: snap.val().noteContent,
      //   themes: snap.val().themesA,
      // })
      console.log('NChg', snap.key); // but will only snap the changed rec
      // following fr PForm (Fin chg)
      // as of 1504am, 20th to appear upon Trash, giving key in qn
      // but appears 3x in succession
      // appears again as 27th (2nd of 4th)
      // appears again as 37th (3rd of 4th)
      // appears again as 44th (4th of 4th)
      // as of 1604am, remains 20th to appear upon Trash, giving key in qn
      // still 3x in succession

      if (this.noteId === snap.key) {
        console.log('NinA chg, this: ', this); // each this is each Note
        // as of 1504am, 21st to appear upon Trash
        // this is a PNote with .state quite unused
        // but nCont is correct, and noteId is the snap.key
        // appears again as 28th (2nd of 4th)
        // appears again as 38th (3rd of 4th)
        // appears again as 45th (4th of 4th)
        // commenting this out on 1604am

        // and as of 1504am i.e err, whose branch in qn, themes is undef
        // console.log('NinB chg, previousNotes: ', previousNotes); // each this is each Note
        // as of 1504am, 22nd to appear upon Trash, giving arr before del
        // appears again as 29th (2nd of 4th)
        // appears again as 39th (3rd of 4th)
        // appears again as 46th (4th of 4th)
        // commenting this out on 1604am

        console.log('NinC chg, snap.val().themesA: ', snap.val().themesA); // each this is each Note
        // as of 1504am, 23rd to appear upon Trash, giving arr less 1
        // next is 2nd FChg
        // appears again as 30th (2nd of 4th)
          // but this time next is 'this inside'
        // appears again as 40th (3rd of 4th), but this time is undef
          // and next is FChg again
        // appears again as 47th (4th of 4th), again undef
          // and next is 'value snap' x2
        // as of 1604am, 21st to appear upon Trash, giving arr less 1
          // but this time next is 'this inside'
          // and the 2nd n last time appears is followed by 'value snap' x2
          // then stops due to err


      // this.setState({
      //   notes: previousNotes
      // })
    }
      for(var i=0; i < previousNotes.length; i++){
        // if(this.NoteId === snap.key){
        //   // console.log('themesC1: ', snap.val().themesA);
        //   console.log('themesC2: ', previousNotes);
        //   // previousNotes[i].themes = snap.val().themesA;
        // }
      }
      // console.log('Nin chg, this: ', this); // each this is each Note

      // this.setState({
      //   notes: previousNotes
      // })
    })

    // dbRef2.on('child_removed', snap => {
    //   for(var i=0; i < previousNotes.length; i++){
    //     if(previousNotes[i].id === snap.key){
    //       previousNotes.splice(i, 1);
    //     }
    //   }

    //   this.setState({
    //     themes: previousNotes
    //   })
    // })

    // dbRef.on('value', data => (
    //   DataDisplay.innerText = data.val()
    //   ));

    // dbRef.on('value', snap => {
    //   this.setState({
    //     text: snap.val()
    //   })
    // });

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

  handleRemoveNote(id){
    console.log('Id in PNote', id);
    // this.props.removeNote(id);
  }

  // removeTheme(id, key){
  //   console.log('rem', key); // when just key, gives theme idx
  //   console.log('rem', id, ' ', key); // when id, key, theme idx goes into id, key becomes undef
  //   // this.props.removeNote(key);
  // }

  removeTheme(key, id){
    console.log('rem', key); // when just key, gives theme idx
    // as of 1504am, 3rd to appear, showing snap.key

    console.log('rem', id, ' ', key); // when id, key, theme idx goes into id, key becomes undef
    // as of 1504am, 4th to appear, giving array key, then snap.key
    
    this.props.removeNote(key, id); 
  }

  render() {
      return (
        <div className="note fade-in">
        <span className="closebtn" 
              onClick={() => this.handleRemoveNote(this.noteId)}>
              &times;
        </span>
        <p className="noteContent">{ this.noteContent }</p>
        <p className="noteContent">{ this.state.text }</p>
        <hr></hr>
        <p className="noteContent">{ this.props.t0 }</p>
        <hr></hr>
        <div className="notesBody">
              {this.props.themes.map((note, idx) => {
                return (
                  // <Note text={note.text} 
                  // noteId={note.id} 
                  // key={note.id} 
                  // removeNote ={this.removeNote}/>
                  <Note text={note} 
                  // noteId={note.id} 
                  noteId={this.noteId} 
                  noteIdx={idx} 
                  // key={note.id} 
                  key={idx} 
                  removeNote={this.removeTheme}/>
                )
              })}
            </div>      
        <hr></hr>
        </div>
      );
    }
}
 
PieceNote.propTypes = {
  noteContent: PropTypes.string
}

export default PieceNote;
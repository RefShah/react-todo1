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

class PieceEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNoteContent: '',
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeNote = this.writeNote.bind(this);
  }
   
  handleUserInput(e){
    this.setState({
        newNoteContent: e.target.value, // the value of the text input
    })
  }

  writeNote(){
    // call a method that sets the noteContent for a note to
    // the value of the input
    this.props.fooaddNote(this.state.newNoteContent);

    // Set newNoteContent back to an empty string.
    this.setState({
        newNoteContent: '',
    })
  }

  render() {
      return (
              <div className="formWrapper">
                  <input className="noteInput"
                  placeholder="Enter a new note..."
                  value={this.state.newNoteContent} 
                  onChange={this.handleUserInput} />
                  <button className="noteButton"
                  onClick={this.writeNote}>Add Note</button>
              </div>    );
    }
}
 
export default PieceEntry;
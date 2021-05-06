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
}
   
handleRemoveNote(id){
  this.props.removeNote(id);
}

render() {
    return (
      <div className="note fade-in">
      <span className="closebtn" 
            onClick={() => this.handleRemoveNote(this.noteId)}>
            &times;
      </span>
      <p className="noteContent">{ this.noteContent }</p>
  </div>
);
  }
}
 
Note.propTypes = {
  noteContent: PropTypes.string
}

export default PieceNote;
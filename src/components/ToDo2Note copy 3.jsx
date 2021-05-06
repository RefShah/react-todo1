import React, { Component } from 'react';
// import './Note.css';
import PropTypes from 'prop-types';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
// import { Glyphicon } from 'react-bootstrap';
// import Glyphicon from '../../node_modules/react-bootstrap/lib/Glyphicon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Note extends Component{

    constructor(props){
        super(props);
        this.text = props.text; 
        this.noteId = props.noteId; 
        // this.noteIdx = props.key; 
        this.noteIdx = props.noteIdx; 
        this.handleRemoveNote = this.handleRemoveNote.bind(this);
    }

    handleRemoveNote(id, key){
        console.log('TDNoteA', id);
        // abv is 1st to appear upon Trash btn, showing the snap.key of Note ...
        // of whose 1 theme was Trashed

        // console.log('TDNoteB', this.noteId); // same val as above
        // console.log('TDNoteC', this.noteIdx); // same val as below
        console.log('TDNoteD', key);
        // 2nd to appear

        // this.props.removeNote(id);
        this.props.removeNote(id, key);
        // this.props.removeTheme(id);
    }

    render(){
        return(
            <div className="theme fade-in col-xs-6">
                <FontAwesomeIcon className="closebtn"c icon={faTrash} onClick={() => this.handleRemoveNote(this.noteId, this.noteIdx)} />
                {/* <span>
                    <Glyphicon glyph="search"/>
                </span>  */}
                {/* <span className="glyphicon glyphicon-info-sign"></span> */}
                {/* <span className="closebtn" 
                      onClick={() => this.handleRemoveNote(this.noteId)}>
                      &times;
                </span> */}
                <p className="noteTheme">{ this.text }</p>
                {/* <button className="glyphicon glyphicon-info-sign" onClick={() => this.handleRemoveNote(this.noteId)} className="btn btn-danger btn-sm">Delete</button> */}
                {/* <button className="glyphicon glyphicon-info-sign" onClick={() => this.handleRemoveNote(this.noteId)}>Delete</button> */}
            </div>
        )
    }
}

Note.propTypes = {
    noteContent: PropTypes.string
}

export default Note;
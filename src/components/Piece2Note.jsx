import React, { Component } from "react";
import TodoItems from "./ToDo1Items";
import Todo2Items from "./ToDo2Items";
import Tabletop from 'tabletop';
import firebase from '@firebase/app';
// import * as firebase from 'firebase/database';
import 'firebase/database';
import { DB_CONFIG } from '../cfg/config';
// import Note from './ToDo2Note';
import Note from './Piece2Theme';
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
    // this.removeNote = this.removeNote.bind(this);
    // this.addNote = this.addNote.bind(this);
    this.addTheme = this.addTheme.bind(this);

    this.database = firebase.database().ref().child('themes');
    this.db2 = firebase.database().ref().child('notes2');

    // both below wrong
    // this.dbRef4 = firebase.database().ref().child('notes2').child('themes');
    // this.dbRef4 = firebase.database().ref().child('notes2/themes');

    this.editor = React.createRef(); // this is crucial for the selection func
    // this.state = {
    //   themes: [],
    //   text: 'Initial'
    // }
    this.state = {
      data: [],
      themes: props.themes,
      // text: 'Initial3',
      text: this.props.newNoteContent,
      height: 100
    };
    this.extractSelection = this.extractSelection.bind(this);
  }
   
  componentDidMount() {
    // const dbRef = firebase.database().ref().child('postIt');
    // const dbRef2 = firebase.database().ref().child('themes');
    const dbRef3 = firebase.database().ref().child('notes2');
    const dbRef4 = firebase.database().ref().child('notes2/themes');
    // const previousNotes = this.state.themes;
    const previousNotes = this.props.themes;
    const previousText = this.state.text;

    // console.log('A2', this); // will output for every Note
    // DataSnapshot
    // dbRef3.on('child_added', snap => {
    //   console.log('P2N, _add, this: ', this);
    //   console.log('P2N, _add, snap: ', snap.key);
    //   // previousNotes.push({
    //   //   id: snap.key,
    //   //   text: snap.val().text,
    //   // })

    //   // this.setState({
    //   //   themes: previousNotes
    //   // })
    // })

    dbRef3.on('child_changed', snap => { // runs for each Note
      // previousNotes.push({
      //   id: snap.key,
      //   noteContent: snap.val().noteContent,
      //   themes: snap.val().themesA,
      // })

      if (this.noteId === snap.key) {
        console.log('NinC0 chg, snap.val().themesA: ', snap.val().themesA); // each this is each Note
        console.log('NinC1 chg, this: ', this); // each this is each Note
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


      this.setState({
        themes: snap.val().themesA
      })
      }
      // for(var i=0; i < previousNotes.length; i++){
      //   // if(this.NoteId === snap.key){
      //   //   // console.log('themesC1: ', snap.val().themesA);
      //   //   console.log('themesC2: ', previousNotes);
      //   //   // previousNotes[i].themes = snap.val().themesA;
      //   // }
      // }
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
    this.props.fooremoveNote(id);
  }

  // removeTheme(id, key){
  //   console.log('rem', key); // when just key, gives theme idx
  //   console.log('rem', id, ' ', key); // when id, key, theme idx goes into id, key becomes undef
  //   // this.props.removeNote(key);
  // }

  removeTheme(key, id){
    const prevThemes = this.props.themes;
    var dbThemes = this.props.themes;
    var flag = 0;
    const dbRef3 = firebase.database().ref().child('notes2');

    console.log('rem', key); // when just key, gives theme idx
    // as of 1504am, 3rd to appear, showing snap.key

    console.log('rem', id, ' ', key); // when id, key, theme idx goes into id, key becomes undef
    // as of 1504am, 4th to appear, giving array key, then snap.key
    
    console.log('props.themes: ', prevThemes);
    // so props is ok
    console.log('this: ', this);
    this.db2.child(key).get().then(function(insnap) {
      if (insnap.exists()) {
        flag = 1;
        // console.log('this inside: ', this);
        // console.log('insnap: ', insnap.val(), 'flag: ', flag);
        var record = insnap.val(); // interesting to note that what is 
        // console.log('insnap.val0: ', record); // returned here is post-del
        dbThemes = insnap.val().themesA;
        console.log('insnap: ', dbThemes);
        const currThemes = [...insnap.val().themesA];
        // when to use const, when to use var?
        // when to use ... when no need?
        // upon research, my belief is for arr fr db, no need for ...
        console.log('dbThemes0: ', dbThemes);
        // dbThemes0 (may) show n-len b4 splice but still 
        // show post-splice arr upon expansion
        dbThemes.splice(id, 1);
        if (dbThemes.length == 0) {
          console.log('len 0');
          dbThemes = [record.noteContent];
          alert('Must have at least one theme. Entire text remains.');
        };
        console.log('dbThemes1: ', dbThemes);
        // dbThemes1 shows (n-1)len after splice and also 
        // show post-splice arr upon expansion
        record.themesA = dbThemes;
        console.log('insnap.val1: ', record);
        dbRef3.child(key).update({
          themesA: dbThemes
        });
      }
      else {
        console.log("No data available");
      }
    }).catch(function(error) {
      console.error(error);
    });
    // this.props.removeNote(key, id); 

    // flag technique doesnt really work cos of multi-threading and async i think
    // console.log('flag: ', flag);
    // if (flag === 1) {
    //   console.log('dbThemes2: ', dbThemes);
    // };
  }

  addTheme(theme){
    // this.database.push().set({ noteContent: note});
  }
  
  extractSelection(e) {
    const dbRef3 = firebase.database().ref().child('notes2');
    var dbThemes = this.props.themes;
    const textareaElem = this.editor.current;
    const selectionStart = textareaElem.selectionStart;
    const selectionEnd = textareaElem.selectionEnd;
    if (selectionStart === selectionEnd) {
      // no selection, just concat
      // this.setState({ text: this.state.text + 'Hello World' });
      alert('A name was submitted: ' + this.noteContent.slice(selectionStart, selectionEnd));
    } else {
      // this.setState({
      //   text:
      //     this.state.text.slice(0, selectionStart) +
      //     'Hello World' +
      //     this.state.text.slice(selectionEnd)
      // });
      // alert('A name was submitted: ' + this.noteContent.slice(selectionStart, selectionEnd));
      var newItem = {
        text: this.noteContent.slice(selectionStart, selectionEnd),
        key: this.noteId
      };
      console.log('extSel, this: ', this);
      // // this.db2.child(this.noteId).push().set({ theme: this.noteContent.slice(selectionStart, selectionEnd)});
      // this.db2.child(this.noteId).child('themes').push().set({ theme: this.noteContent.slice(selectionStart, selectionEnd)});

      // above is prev approach to add new branch
      // now below try add array element
      this.db2.child(this.noteId).get().then(function(insnap) {
        if (insnap.exists()) {
          // console.log('this inside: ', this);
          // console.log('insnap: ', insnap.val(), 'flag: ', flag);
          var record = insnap.val(); // interesting to note that what is 
          console.log('eS, insnap.val0: ', record); // returned here is post-del
          dbThemes = insnap.val().themesA;
          console.log('eS, insnap: ', dbThemes);
          const currThemes = [...insnap.val().themesA];
          // when to use const, when to use var?
          // when to use ... when no need?
          // upon research, my belief is for arr fr db, no need for ...
          // console.log('eS, dbThemes0: ', dbThemes);
          // dbThemes.splice(id, 1);
          dbThemes.push(newItem.text);
          // console.log('eS, dbThemes1: ', dbThemes);
          record.themesA = dbThemes;
          console.log('eS, insnap.val1: ', record);
          console.log('eS, dbRef3: ', dbRef3);
          dbRef3.child(newItem.key).update({
            themesA: dbThemes
          });
        }
        else {
          console.log("No data available");
        }
      }).catch(function(error) {
        console.error(error);
      });
  
      // // this.props.addNote(this.state.newNoteContent);
      // this.addNote(this.state.text.slice(selectionStart, selectionEnd));

    }
    textareaElem.focus();

    console.log('end of extSel', this.state.themes);
    // but state may not have been updated yet so may show b4 +1 len
       
    e.preventDefault();  
  }
  
  changeTextareaHandler = () => {
    console.log('A3', this);
    const elemHeight = this.editor.current.scrollHeight;
    this.setState({ height: elemHeight });
  };

render() {
  var tasks = {
    wip: [],
    complete: []
  }
  this.state.themes.forEach ((t) => {
    // tasks[t.category].push(
    //     <div key={t.name} 
    //         onDragStart = {(e) => this.onDragStart(e, t.name)}
    //         draggable
    //         className="draggable"
    //         style = {{backgroundColor: t.bgcolor}}
    //     >
    //         {t.name}
    //     </div>
    // );
    tasks["wip"].push(
      <div key={t} 
          onDragStart = {(e) => this.onDragStart(e, t)}
          draggable
          className="draggable"
      >
          {t}
      </div>
  );
});
console.log(tasks)

  return (
        <div className="note fade-in">
        <span className="closebtn" 
              onClick={() => this.handleRemoveNote(this.noteId)}>
              &times;
        </span>
        {/* <p className="noteContent">{ this.noteContent }</p>
        <p className="noteContent">{ this.state.text }</p> */}
        <hr></hr>
        {/* <p className="noteContent">{ this.props.t0 }</p>
        <hr></hr> */}
        {/* <div className="notesBody">
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
            </div>       */}
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
                        // value={this.state.text}
                        value={this.noteContent}
                        onMouseOver={this.changeTextareaHandler}
                        // onChange={e => this.setState({ text: e.target.value })}
                        placeholder="enter task"
                        readOnly>
                      </textarea>
                    </div>
                    <button className="addBtn" type="submit">add2</button>
                  </form>
                </div>
              </Col>
              <Col>
              <div className="notesBody">
                {/* <div>Suspect have to make below this.state instead of props</div>
                <div>But where did I get to approach to use props?</div> */}
                {/* <div>Tried using state but non-upd issue remains</div> */}
                {this.state.themes.map((note, idx) => {
                  return (
                    // <p>{note}</p>
                    // <Note text={note.text} 
                    // noteId={note.id} 
                    // key={note.id} 
                    // removeNote ={this.removeNote}/>
                    <Note text={idx + " " + note} 
                    // noteId={note.id} 
                    noteId={this.noteId} 
                    noteIdx={idx} 
                    // key={note.id} 
                    key={idx} 
                    removeNote={this.removeTheme}/>
                  )
                })}
              </div>
              </Col>
              <Col></Col>
              <Col></Col>
            </Row>
          </Container>
        </div> {/* <!-- #className="todoListMain" --> */}
        {/* <hr></hr> */}
        </div>
      );
    }
}
 
PieceNote.propTypes = {
  noteContent: PropTypes.string
}

export default PieceNote;
import React, { Component } from 'react';
// import logo from './logo.png';
//import './App.css';
import Tabletop from 'tabletop';
import PostIt1 from '../components/postIt1'

class GSheet1 extends React.Component {
  constructor(props) {
    super(props)
    this.editor = React.createRef();
    this.state = {
      data: [],
      text: 'Initial2',
      loaded: false
    }
  }
  
  componentDidMount() {
    Tabletop.init({
      key: '1MmHjfOgvAPvFk8pe2UOciV0vIMxBt7EBa94kyHNHCO0',
      callback: googleData => {
        this.setState({
          data: googleData,
          loaded: true,
          text: googleData[0].A1
        })
      },
      simpleSheet: true
    })
  }

  render() {
    const { data } = this.state
    return (

      <div className="GSheet1">
    <PostIt1 />
         <div id="book-details">
          {
            data.map(obj => {
              return (
                     <div key={obj.A1}>
                         <h2><a href = {obj.A1}  target="_blank"> {obj.A1}</a></h2>
                         <b>{obj.A1}</b>
                      </div>
             )
            })
            // alert('A name was submitted: ');
          }
        {/* <button
                  onClick={() => {
                    alert('A name was submitted: ' + data);
                    console.log(data[0].A1);
                  }}
        >
          Populate</button> */}
        <textarea
            ref={this.editor}
            value={this.state.text}
            // value={this.state.loaded}
            onChange={e => this.setState({ text: e.target.value })}
                >
        </textarea>
        <button
          onClick={() => {
            const textareaElem = this.editor.current;
            const selectionStart = textareaElem.selectionStart;
            const selectionEnd = textareaElem.selectionEnd;
            if (selectionStart === selectionEnd) {
              // no selection, just concat
              this.setState({ text: this.state.text + 'Hello World' });
            } else {
              this.setState({
                text:
                  this.state.text.slice(0, selectionStart) +
                  'Hello World' +
                  this.state.text.slice(selectionEnd)
              });
              alert('A name was submitted: ' + this.state.text.slice(selectionStart, selectionEnd));
            }
            textareaElem.focus();
          }}
        >
          Insert
        </button>
        </div>
</div>

);
}
}

export default GSheet1;
import React, { Component } from 'react';
// import logo from './logo.png';
//import './App.css';
import Tabletop from 'tabletop';
import PostIt1 from '../components/postIt1'

class GSheet1 extends React.Component {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }
  
  componentDidMount() {
    Tabletop.init({
      key: '1MmHjfOgvAPvFk8pe2UOciV0vIMxBt7EBa94kyHNHCO0',
      callback: googleData => {
        this.setState({
          data: googleData
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
                         <h1><a href = {obj.A1}  target="_blank"> {obj.A1}</a></h1>
                         <b>{obj.A1}</b>
                      </div>
             )
            })
          }
        </div>

</div>

);
}
}

export default GSheet1;
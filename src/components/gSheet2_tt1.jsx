import React, { Component } from 'react';
// import logo from './logo.png';
// import '../App.css';
import Tabletop from 'tabletop';
import PostIt1 from '../components/postIt1'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  BrowserView,
  MobileView,
  AndroidView,
  isDesktop,
  isMacOs,
  isBrowser,
  isMobile,
  isAndroid,
  isIOS
} from "react-device-detect";
import { Textfit } from 'react-textfit';
import ScaleText from "react-scale-text";

class GSheet1 extends React.Component {
  constructor(props) {
    super(props)
    this.editor = React.createRef();
    this.state = {
      data: [{A1: "A1", B1: "B2", C1: "C2", D1: "D2", E1: "E2"}],
      tdata: [],
      text: 'Initial2',
      loaded: false
    }
    // Tabletop.init({
    //   key: '1MmHjfOgvAPvFk8pe2UOciV0vIMxBt7EBa94kyHNHCO0',
    //   callback: googleData => {
    //     this.setState({
    //       data: googleData,
    //       loaded: true,
    //       text: googleData[0].A1
    //     })
    //   },
    //   simpleSheet: true
    // })
    console.log('0: ', this.state);
  }
  
  componentDidMount() { 
    if (isDesktop) {
      console.log('dev: isDsk');
    }
    if (isMacOs) {
      console.log('dev: isMac');
    }
    if (isMobile) {
      console.log('dev: isMob');
    }
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
    const result = Object.assign(...Object.keys(this.state.data[0]).map( key =>
      ({ [key]: this.state.data.map( o => o[key] ) })
    ));
    console.log('1: ', this.state);
    console.log('3a: ', result);
  }

  render() {
    const { data } = this.state
    console.log('2: ', this.state);
    if (this.state.loaded) {
      const result = Object.assign(...Object.keys(this.state.data[0]).map( key =>
        ({ [key]: this.state.data.map( o => o[key] ) })
      ));
      console.log('3b: ', result);
    };
    let D = {};
    let L = this.state.data;
    // Object.keys(L[0]).forEach(k => {
    //     D[k] = L.map(o => o[k]);
    // });
    var dict = this.state.data;
    const obj = {
      foo: 'bar',
      baz: 42
    }
    // console.log('Object.entries')
    // console.log(
    //   Object.entries(obj)
    // )
    // console.log('Mapping')
    // console.log(
    //   Object.entries(obj)
    //   .map( ([key, value]) => `My key is ${key} and my value is ${value}` )
    // )

    // console.log('4: ', D);
    console.log('5: ', L[0]);
    // for (var key in dict) {
    //   console.log('6: ', dict[key]) // this seems unreliable
    // }
    // const sClass = "subj2 child";
    const sClass = "child";
                
    return (

      <div className="GSheet1">
        {/* <PostIt1 /> */}
        <div id="book-details">
          {/* {
            data.map(obj => {
              return (
                <div className="subj1" key={obj.A1}>
                <h2><a href = {obj.A1}  target="_blank"> {obj.A1}</a></h2>
                         <b>{obj.A1}</b>
                      </div>
             )
            })
            // alert('A name was submitted: ');
          } */}
        </div>
        <div className="todoListMain">
          <Container className="mainContainer">
            <Row>
              <Col className="leftCol">
                <div className="header notesBody">
                </div>
              </Col>
              <Col>
                {
                  data.map(obj => {
                    return (
                      <div>
                      <div key={obj.A1}>
                              <h2><a href = {obj.A1}  target="_blank"> {obj.A1}</a></h2>
                              <b>{obj.A1}</b>
                            </div>
                      <div className="subj2 parent" style={{ width: "100px", height: "50px" }}>
                      <ScaleText maxFontSize={20}>
                      <div className={sClass}>{obj.A1}</div>
                      </ScaleText>
                      </div>
                      </div>
                    )
                  })
                  // alert('A name was submitted: ');
                }
              </Col>
              <Col>
                {
                  data.map(obj => {
                    return (
                            <div key={obj.B1}>
                              <h2><a href = {obj.B1}  target="_blank"> {obj.B1}</a></h2>
                              {/* <b>{obj.B1}</b> */}
                              <div className="subj1 parent" style={{ width: "100px", height: "50px" }}>
                                <ScaleText maxFontSize={20}>
                                <div className={sClass}>{obj.B1}</div>
                                </ScaleText>
                              </div>
                              {/* <div style={{backgroundColor: "#F6BB42", height: 50, borderRadius: '5px', padding: 5}}>{obj.B1}</div> */}
                            </div>
                  )
                  })
                  // alert('A name was submitted: '); style={{ height: this.state.height, padding: 0 }}
                }
              </Col>
              <Col>
              {
                  data.map(obj => {
                    return (
                            <div key={obj.C1}>
                              <h2><a href = {obj.C1}  target="_blank"> {obj.C1}</a></h2>
                              {/* <b>{obj.C1}</b> */}
                              <div className="subj1 parent" style={{ width: "100px", height: "50px" }}>
                                <ScaleText maxFontSize={20}>
                                <div className={sClass}>{obj.C1}</div>
                                </ScaleText>
                              </div>
                              {/* <div style={{backgroundColor: "#F6BB42", height: 50, borderRadius: '5px', padding: 5}}>{obj.B1}</div> */}
                            </div>
                  )
                  })
                  // alert('A name was submitted: '); style={{ height: this.state.height, padding: 0 }}
                }
              </Col>
            </Row>
          </Container>
          <BrowserView>
              <h3> This is rendered only in browser </h3>
          </BrowserView>
          <MobileView>
              <h3> This is rendered only on mobile </h3>
          </MobileView>
          <AndroidView>
              <h3> This is rendered only on Android </h3>
          </AndroidView>
        </div> {/* <!-- #className="todoListMain" --> */}
      </div> /* <!-- #className="GSheet1" -->  */

    );
  }
}

export default GSheet1;
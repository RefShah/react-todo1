import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import 'bootstrap/dist/css/bootstrap.css';
// import PostIt1 from './components/postIt1'
import GSheet1 from './components/gSheet1'
import GSheet2 from './components/gSheet2'
import ToDo1 from './components/ToDo1'
import ToDo2 from './components/ToDo2'
import PieceForm from './components/PieceForm'
import Piece2Form from './components/Piece2Form'
import FJollyToDoList from "./components/FJollyToDoList";
import firebase from '@firebase/app';
import PieceNote from "./components/TryCircles1";
import styled, { css } from 'styled-components';
import Draggable from "./Circles"

var firebaseConfig = {
  apiKey: "AIzaSyDFF05g_yxGmH4fUjp2tQO7MmlB2aRyY80",
  authDomain: "get-theme1.firebaseapp.com",
  projectId: "get-theme1",
  storageBucket: "get-theme1.appspot.com",
  messagingSenderId: "204613864015",
  appId: "1:204613864015:web:34560516be923426cb383a",
  measurementId: "G-3X0Z7HMDD2"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const firebaseApp = firebase.initializeApp(firebaseConfig);

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

// Use Title and Wrapper like any other React component – except they're styled!
// render(
//   <Wrapper>
//     <Title>
//       Hello World!
//     </Title>
//   </Wrapper>
// );

ReactDOM.render(
  <React.StrictMode>
    {/* <ToDo2 /> */}
    <Piece2Form />
    {/* <PieceNote noteContent={"note.noteContent"} 
                  /> */}
  {/* <Draggable>
    <Title>
      Hello World!
    </Title>
  </Draggable> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

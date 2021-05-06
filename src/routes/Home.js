import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/todo">Click Here for ToDo</Link>
      <p></p>
      <Link to="/todo1">Click Here for ToDo1</Link>
      <p></p>
      <Link to="/clipboard1">Click Here for Clipboard1</Link>
      <p></p>
      <Link to="/select1">Click Here for Select1</Link>
    </div>
  );
}

export default Home;

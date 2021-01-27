import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ToDo() {
  const [todoData, setToDoData] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [error, setError] = useState(false);

  const addItem = (e) => {
    e.preventDefault();
    if (error || textInput.length === 0) return;

    const tempData = [...todoData];
    tempData.push(textInput);
    setToDoData(tempData);
    setTextInput("");
  };

  useEffect(() => {
    if (textInput.length > 10) setError(true);
    else setError(false);
  }, [textInput]);

  const removeItem = (index) => {
    let newData = [...todoData];
    newData.splice(index, 1);
    setToDoData(newData);
  };

  const editItem = (index) => {
    if (error || textInput.length === 0) return;

    let newData = [...todoData];
    newData[index] = textInput;
    setToDoData(newData);
  };

  console.log(todoData);

  return (
    <div>
      <h1>ToDo</h1>
      <Link to="/">Click Here for Home</Link>
      <form onSubmit={addItem}>
        <label>
          text input:
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {error ? <span style={{ color: "red" }}>Error lah!</span> : null}
      {todoData.map((item, index) => {
        return (
          <li key={index}>
            {item} <button onClick={() => removeItem(index)}>Remove</button>{" "}
            <button onClick={() => editItem(index)}>Update</button>
          </li>
        );
      })}
    </div>
  );
}

export default ToDo;

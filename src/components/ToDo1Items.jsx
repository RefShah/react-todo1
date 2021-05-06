import React, { Component } from "react";
 
class TodoItems extends Component {
  removeItem (index) {
    // let newData = [...this.props.entries];
    // newData.splice(index, 1);
    // // setToDoData(newData);
    // this.setState({newData});
    console.log(index);
  };

  createTasks(item) {
    // return <li key={item.key}>{item.text}<button onClick={() => this.removeItem(item.key)}>Remove</button></li>
    return <li key={item.key}>{item.text}</li>
  }
 
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};
 
export default TodoItems;
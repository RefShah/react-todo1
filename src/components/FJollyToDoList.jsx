import React, { Component } from 'react';

import FJollyToDo from './FJollyToDo';
import FJollyToDoForm from './FJollyToDoForm';

class FJollyToDoList extends Component {

    //Component state with default values
    state = {
        addTodoValue: "",
        todos: [
        ]
    }

    //Local helper method to get date
    getTime() {
        let d = new Date();
        var n = d.getTime();
        return n;
    }

    //method called from Todo component
    handleDelete = todo => {
        const todos = this.state.todos.filter((t) => {
            return t.id !== todo
        });
        this.setState({ todos });
    }

    handleDone = todo => {
        const todos = [...this.state.todos];
        todos.map((t) => {
            if (t.id === todo.id) {
                t.isDone = !t.isDone;
            }
            return t;
        });
        this.setState({todos});
    }

    //method called from AddTodo component
    addNewTodo = value => {
        if (value) {
            const todos = [...this.state.todos];
            todos.push(
                {
                    id: this.getTime(),
                    value: value,
                    isDone: false
                }
            );
            this.setState({ addTodoValue: "", todos })
        } else {
            console.log("Please Add Todo Text");
        }
    }

    render() {
        return (
            <table className="table">
                <tbody>
                    {this.state.todos.map((todo, index) => (
                        <tr key={todo.id}>
                            <FJollyToDo index={index+1} todo={todo} fooDelete={this.handleDelete} fooDoneDone={this.handleDone} />
                        </tr>
                    ))}
                    <tr>
                        <td colSpan="4" className="text-center">
                            <FJollyToDoForm fooAddTodo={this.addNewTodo} addTodoValue={this.state.addTodoValue} />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default FJollyToDoList;
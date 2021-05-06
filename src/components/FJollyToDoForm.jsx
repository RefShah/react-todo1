import React, { Component } from 'react';

class FJollyToDoForm extends Component {
    state = {
        defaultValue: "",
        value: this.props.addTodoValue
    }

    handleChange = (e) => {
        //Updating local component state
        this.setState({
            value: e.target.value
        });
    }

    clearInput = () => {
        //Clear existing value in input
        document.getElementById("todoValue").value = "";
        
        //Updating local component state
        this.setState({value:""});
    }

    addTodo = () => {
        //Call method reference in Todos component using props
        this.props.fooAddTodo(this.state.value);
        this.clearInput();
    }

    render() {
        return (
            <div className="input-group mb-3">
                <input type="text" className="form-control" id="todoValue" placeholder="ToDoFJ" onChange={this.handleChange} />
                <textarea 
                    ref={this.editor}
                    value={this.state.text}
                    onChange={e => this.setState({ text: e.target.value })}
                    placeholder="enter task">
                </textarea>
                <div className="input-group-append">
                    <button onClick={this.addTodo} className="btn btn-outline-secondary" type="button" id="button-addon2">Add New ToDo</button>
                </div>
            </div>
        );
    }
}

export default FJollyToDoForm;
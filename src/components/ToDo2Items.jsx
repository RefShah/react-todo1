import React, { Component } from 'react';

class Todo2Items extends Component {

    render() {
        return (
            <React.Fragment >
                <td style={{ width: 50 }} className="text-center">
                    {this.props.todo.key}
                </td>
                {/* <td style={{ width: 15 }} className="text-center">
                    <input type="checkbox" defaultChecked={this.props.todo.isDone}  onChange={() => this.props.fooDoneDone(this.props.todo)} />
                </td> */}
                <td>
                    {
                        this.renderTodo()
                    }
                </td>
                <td style={{ width: 100 }} className="text-center">
                    <button onClick={() => this.props.newDelete(this.props.todo.key)} className="btn btn-danger btn-sm">Delete</button>
                </td>
            </React.Fragment>
        );
    }

    renderTodo(){
        // if(this.props.todo.isDone)
        // return <s>{this.props.todo.value}</s>;
        // else
        return this.props.todo.text;
    }

}

export default Todo2Items;
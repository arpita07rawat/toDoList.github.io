import React, { Component } from 'react';
import { v4 as uid } from 'uuid';
import List from './list';
import '../shared/css/todo.css';

class Todo extends Component {
    constructor() {
        super();
        this.state = {
        task: '',
        items: []
        };
    }
    componentWillMount() {
        this.setState({
        items: [
            {
            id: uid(),
            task: 'Buy Grocery',
            completed: false
            },
            {
                id: uid(),
                task: 'Send Email',
                completed: false
            },
            {
                id: uid(),
                task: 'Finish Assignment',
                completed: false
            },
            {
                id: uid(),
                task: 'Bake Cake',
                completed: false
            },
        ]
        }); 
    }
    handleOnChange = e => {
        const { target: { value } } = e;
        this.setState({
        task: value
    });
    }
    handleOnSubmit = e => {
        e.preventDefault();
        if (this.state.task.trim() !== '') {
            this.setState({
                task: '',
                items: [
                    ...this.state.items,
                    {
                        id: uid(),
                        task: this.state.task,
                        complete: false
                    }
                ]
            });
        }
    }
    markAsCompleted = id => {
        const foundTask = this.state.items.find(
            task => task.id === id 
        );
        foundTask.completed = true;
        this.setState({
            items: [
                ...this.state.items,
                ...foundTask
            ]
        });
    }
    removeTask = id => {
        const filteredTasks=this.state.items.filter(
            task => task.id !== id
        );
        this.setState({
            items: filteredTasks
        });
    }
    render() {
        return (
        <div className='container'>
            <h1 className='h1'>TODO List</h1>
            <p><span className='mark'>Do it now.</span></p>
            <span className='h3'>New task:  </span>
            <form onSubmit={this.handleOnSubmit}>
                <input value={this.state.task} onChange={this.handleOnChange} />
            </form>
            <List 
            items={this.state.items} 
            markAsCompleted={this.markAsCompleted} 
            removeTask={this.removeTask} />
        </div>
        );
    }
}
export default Todo;
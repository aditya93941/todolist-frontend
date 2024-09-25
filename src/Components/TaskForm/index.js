import React from 'react';
import './index.css';

class TaskForm extends React.Component {
    state = {
        title: this.props.task ? this.props.task.title : '',
        description: this.props.task ? this.props.task.description : ''
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description } = this.state;
        this.props.onSave({ title, description });
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        const { title, description } = this.state;

        return (
            <form className='taskForm' onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    placeholder="Task Title"
                    required
                    className='taskInput'
                />
                <textarea
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    placeholder="Task Description"
                    className='taskTextarea'
                />
                <div className='buttonGroup'>
                    <button type="submit" className='saveButton'>Save</button>
                    <button type="button" onClick={this.props.onCancel} className='cancelButton'>Cancel</button>
                </div>
            </form>
        );
    }
}

export default TaskForm;

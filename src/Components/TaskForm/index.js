import React from 'react';
import './index.css'

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
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleChange}
                    placeholder="Title"
                    required
                />
                <textarea
                    name="description"
                    value={description}
                    onChange={this.handleChange}
                    placeholder="Description"
                />
                <div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={this.props.onCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

export default TaskForm;

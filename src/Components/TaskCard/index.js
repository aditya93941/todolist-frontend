import React from 'react';
import './index.css'

class TaskCard extends React.Component {
    render() {
        const { task, onEdit, onDelete, onToggleComplete } = this.props;

        return (
            <div className="task-card">
                <h3 className='taskTitle'>{task.title}</h3>
                <p>{task.description}</p>
                <div className='status'>
                    <label htmlFor='checkbox'>
                        Completed
                    </label>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggleComplete(task.id)}
                        id='checkbox'
                    />
                </div>
                <div className='btnCard'>
                    <button className='editBtn' onClick={() => onEdit(task)}>Edit</button>
                    <button className='editBtn' onClick={() => onDelete(task.id)}>Delete</button>
                </div>
            </div>
        );
    }
}

export default TaskCard;

import React from 'react';
import Cookies from 'js-cookie';
import TaskCard from '../TaskCard';
import TaskForm from '../TaskForm';
import './index.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isAdding: false,
            isEditing: false,
            editingTask: null,
            token: Cookies.get('token')
        };
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks = async () => {
        try {
            const response = await fetch('https://todolist-backend-6obf.onrender.com/api/tasks', {
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            });
            const data = await response.json();
            if (data.tasks === undefined) {
                this.setState({ tasks: [] });
            } else {
                this.setState({ tasks: data.tasks });
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    handleAddTask = () => {
        this.setState({ isAdding: true, isEditing: false, editingTask: null });
    };

    handleSaveTask = async (task) => {
        try {
            if (this.state.isEditing) {
                const updatedTask = { ...this.state.editingTask, ...task };
                await fetch(`https://todolist-backend-6obf.onrender.com/api/tasks/${this.state.editingTask.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.token}`
                    },
                    body: JSON.stringify(updatedTask)
                });
            } else {
                await fetch('https://todolist-backend-6obf.onrender.com/api/tasks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.state.token}`
                    },
                    body: JSON.stringify(task)
                });
            }
            this.setState({ isAdding: false, isEditing: false, editingTask: null });
            this.fetchTasks();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };
    

    handleEditTask = (task) => {
        this.setState({ isAdding: false, isEditing: true, editingTask: task });
    };

    handleDeleteTask = async (taskId) => {
        try {
            await fetch(`https://todolist-backend-6obf.onrender.com/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${this.state.token}`
                }
            });
            this.fetchTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    handleToggleComplete = async (taskId) => {
        const task = this.state.tasks.find(t => t.id === taskId);
        try {
            await fetch(`https://todolist-backend-6obf.onrender.com/api/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.state.token}`
                },
                body: JSON.stringify({ ...task, completed: !task.completed })
            });
            this.fetchTasks();
        } catch (error) {
            console.error("Error toggling task completion:", error);
        }
    };

    handleCancel = () => {
        this.setState({ isAdding: false, isEditing: false, editingTask: null });
    };

    onLogout = () =>{
        Cookies.remove('token')
        this.props.history.replace('/login')
    }

    onClickProfile = ()=>{
        this.props.history.replace('/profile')
    }

    render() {
        const { tasks, isAdding, isEditing, editingTask } = this.state;

        return (
            <div className="home-page">
               <nav className='nav-bar'>
                    <h1 className='homeHeadong'>Task Manager</h1>
                    <div className='logoutCard'>
                        <button onClick={this.onClickProfile} className='profileBtn'>Go to Profile</button>
                        <button className='add' onClick={this.handleAddTask}>Add Task</button>
                        <button onClick={this.onLogout} className='logoutBtn'>logout </button>
                    </div>
               </nav>
                <div className='taskContainer'>
                {isAdding || isEditing ? (
                    <TaskForm
                        task={editingTask}
                        onSave={this.handleSaveTask}
                        onCancel={this.handleCancel}
                    />
                ) : (
                    tasks.length > 0 ? (
                        tasks.map(task => (
                            <TaskCard
                                key={task.id}
                                task={task}
                                onEdit={this.handleEditTask}
                                onDelete={this.handleDeleteTask}
                                onToggleComplete={this.handleToggleComplete}
                            />
                        ))
                    ) : (
                        <p className='emptyTaskText'>No tasks to show.</p>
                    )
                )}
                </div>
            </div>
        );
    }
}

export default HomePage;

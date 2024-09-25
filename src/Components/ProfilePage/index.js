import React from 'react';
import Cookies from 'js-cookie'
import './index.css'

class ProfilePage extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        isEditing: false,
        error: ''
    };

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = async () => {
        try {
            const response = await fetch('https://todolist-backend-6obf.onrender.com/profile', {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            });
            const data = await response.json();
            if (!data.success) {
                this.setState({ error: data.message });
            } else {
                this.setState({
                    name: data.user.name,
                    email: data.user.email,
                    password:data.user.password
                });
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    handleEdit = () => {
        this.setState({ isEditing: true });
    };

    handleCancel = () => {
        this.setState({ isEditing: false });
    };

    handleUpdate = async () => {
        try {
            const response = await fetch('https://todolist-backend-6obf.onrender.com/profile/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            });
            const data = await response.json();
            if (data.error) {
                this.setState({ error: data.message });
            } else {
                this.setState({ isEditing: false, error: '' });
                this.fetchProfile(); 
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    inClickBackInProfile = ()=>{
        this.props.history.replace('/')
    }

    render() {
        const { name, email, isEditing, error } = this.state;

        return (
            <div className='profileMainCArd'>
                <h2>Profile</h2>
                {isEditing ? (
                    <div>
                        <input className='profileInput'
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                        />
                        <input
                            className='profileInput'
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        <input
                            className='profileInput'
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <br/>
                        <button className='backBtn' onClick={this.handleUpdate}>Save</button>
                        <button className='backBtn' onClick={this.handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <div className='profileCard'>
                        <p><strong>Name:</strong> {name}</p>
                        <p><strong>Email:</strong> {email}</p>
                        <p><strong>Password:</strong> ******** (hidden for security)</p>
                        <button className='backBtn' onClick={this.handleEdit}>Edit</button>
                        <button onClick={this.inClickBackInProfile} className='backBtn'>back</button>
                    </div>
                )}
                {error && <p>{error}</p>}
            </div>
        );
    }
}

export default ProfilePage;

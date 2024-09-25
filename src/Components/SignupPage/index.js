import React from 'react';
import './index.css';
import Cookies from 'js-cookie'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        message: ''
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { name, email, password } = this.state;

        const response = await fetch('https://todolist-backend-6obf.onrender.com/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        this.setState({ message: data.message });

        if (data.success) {
            this.props.history.push('/login');
        }
    };

    render() {
        const { name, email, password, message } = this.state;
        const token = Cookies.get('token')
        if(token!==undefined){
            return <Redirect to='/'/>
        }
        return (
            <div className="signup-container">
                <h2>Signup</h2>
                {message && <p className="message">{message}</p>}
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                    />
                    <button type="submit">Signup</button>
                </form>
                <p>
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </div>
        );
    }
}

export default Signup;

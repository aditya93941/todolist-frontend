import React from 'react';
import "./index.css"
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: ''
    };

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        const response = await fetch('https://todolist-backend-6obf.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            console.log(data.token)
            Cookies.set('token',data.token,{expires:10})
            this.props.history.push('/'); 
            this.setState({ error: '' });
        } else {
            this.setState({ error: data.message });
        }
    };

    render() {
        const token = Cookies.get('token')
        if(token!==undefined){
            return <Redirect to='/'/>
        }
        return (
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    {this.state.error && <p className="error">{this.state.error}</p>}
                </form>
                <p>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </p>
            </div>
        );
    }
}

export default Login;

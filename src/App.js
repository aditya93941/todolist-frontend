import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import ProfilePage from './Components/ProfilePage';
import HomePage from './Components/HomePage';
import ProtectedRoute from './Components/ProtectedRoute';


class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <ProtectedRoute exact path ='/' component={HomePage}/>
                    <Route exact path="/login" component={LoginPage} />
                    <Route  exact path="/signup" component={SignupPage} />
                    <ProtectedRoute exact path="/profile" component={ProfilePage} />
                </Switch>
            </Router>
        );
    }
}

export default App;

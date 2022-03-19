import React, {useState} from 'react';

import Demo from './components/demo/Demo';
import Auth from './components/auth/Auth';
import Dashboard from "./components/dashboard/Dashboard";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const App = () => {
    const [isAuthorized, setIsAuthorized] = useState(true);

    return (
        <div>
            <Router>
                <Switch>
                    <Route path={'/demo'}><Demo /></Route>
                    <Route path={'/dashboard'}><Dashboard /></Route>
                    <Route path={'/'}>
                        { isAuthorized ? <Redirect to={'/dashboard'} /> : <Auth /> }
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}

export default App;

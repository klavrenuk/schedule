import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";

import Demo from './components/demo/Demo';
import Auth from './components/auth/Auth';
import Dashboard from "./components/dashboard/Dashboard";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Loading from "./components/general/Loading";

const App = () => {
    const dispatch = useDispatch();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isQuery, setIsQuery] = useState(true);

    useEffect(() => {
        if(isQuery && location.pathname !== '/') {
            whoIAM();
            setIsQuery(false);

        } else {
            setIsLoading(false);
        }

    }, [isQuery]);

    const whoIAM = () => {
        let user = {};

        axios({
            url: '/api/who-i-am',
            method: 'GET'
        }).then((response) => {
            if(response.status !== 200) {
                throw new Error();
            }

            user = response.data;
            setIsAuthorized(true);

        }).catch(() => {
            window.location.href = '/';
            setIsAuthorized(false);

        }).finally(() => {
            dispatch({type: 'setUser', user: user});
            setIsLoading(false);
        })
    }

    return (
        <div>
            {
                isLoading ?
                    <Loading type={'page'} />
                    :
                    <Router>
                        <Switch>
                            <Route path={'/demo'}><Demo /></Route>
                            <Route path={'/dashboard'}><Dashboard /></Route>
                            <Route path={'/'}>
                                { isAuthorized ?
                                    <Redirect to={'/dashboard'} /> :
                                    <Auth />
                                }
                            </Route>
                        </Switch>
                    </Router>
            }
        </div>
    )
}

export default App;

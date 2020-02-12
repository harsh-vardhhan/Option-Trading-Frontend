import React from 'react';
import {Home, OptionChain, Landing, Login, Account, Blog} from './pages';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route
                    exact={true}
                    path='/'
                    component={Landing}
                />
                <Route
                    exact={true}
                    path='/home'
                    component={Home}
                />
                <Route
                    exact={true}
                    path='/blog'
                    component={Blog}
                />
                <Route
                    exact={true}
                    path='/login'
                    component={Login}
                />
                <Route
                    exact={true}
                    path='/account'
                    component={Account}
                />
                <Route
                    path='/optionchain'
                    component={OptionChain}
                />
            </Switch>
        </Router>
    );
}
import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
import {useLoginData} from './context/authContext';

export default function AuthRoute({component: Comp, ...rest}) {
    const [isLogin] = useLoginData();
    return (
        <Route
            {...rest}
            render={props => !isLogin ? <Comp {...props}/> : <Redirect
                to={{
                    pathname: '/',
                    state: {from: props.location}
                }}
        />}
        />
    );
}
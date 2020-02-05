import React from 'react';
import {getAccessToken, validateToken} from '../api/login';
import Axios from 'axios';

export const AuthContext = React.createContext(initialState);

const initialState = {
    isLogin: false,
    token: ''
};
const userReducer = (state, action) => {
    switch (action.type) {
    case 'IS_LOGIN' : return {isLogin: true, token: action.token};
    default: return state;
    }
};

/**
 * this takes a pram which will get requestToken in the serachArgument need to get requestToken by
 * spliting from argument. Then need to get accessToken by makeing call to **getAccessToken**
 * to validate this token on every login by making call to **validateToken**
 * which give status if status=0 logout else login
 * @param {*} searchPram
 */
export async function useAuth(searchPram) {
    const [state, dispatch] = React.useReducer(userReducer, initialState);
    const resqustToken = searchPram.split('?code=').filter(s => s !== '')[0];
    React.useEffect(() => {
        async function validate() {
            try {
                const res = resqustToken && await getAccessToken(resqustToken);
                console.log('res from acceToken expected {res:acc_token}', res);
                const {accessToken} = res.data;

                try {
                    if (res !== undefined) {}
                    const res = await validateToken(accessToken);
                    console.log('validated token rspose', res);
                    const {data: {status}} = res;
                    if (status) {
                        window.localStorage.setItem('token', `${accessToken}`);
                        window.localStorage.setItem('isLogin', 'true');
                        dispatch({type: 'IS_LOGIN'});
                    }
                } catch (e) {
                    console.log('error form api /validateToken/ message: ', e);
                }
            } catch (e) {
                console.log('errros form api /accesstoken/ message: ', e);
            }
        }
        validate();
    }, []);
    return [state.isLogin, state.loginToken];
}
export function useLoginData() {
    const [isLogin, setLogin] = React.useState(window.localStorage.getItem('isLogin'));
    const [token, setToken] = React.useState(window.localStorage.getItem('token'));

    React.useEffect(() => {
        setLogin(window.localStorage.getItem('isLogin'));
        setToken(window.localStorage.getItem('token'));
    });
    return [isLogin, token];
}

export default function AuthProvider({children}) {
    return (
        <AuthContext.Provider value={initialState}>
            {children}
        </AuthContext.Provider>
    );
}

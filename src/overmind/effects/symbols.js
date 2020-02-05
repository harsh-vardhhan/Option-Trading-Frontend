import {fetch} from '../../api/server';
const headers = {
    Authorization: 'Token ' + localStorage.getItem('customertoken')
};

export const symbolsEffects = {
    fetchQuote: (actions) => fetch.post('/quote/', actions, {headers}),
    getRedirectPath: () => fetch('/redirecturl'),
    getAccessToken: (body) => fetch.post('/accesstoken/', body),
    validateToken: (token) => fetch.post('/validatetoken/', {accessToken: token}),
    getQuote: (token) => {
        const body = {
            accessToken: token,
            symbol: 'NIFTY',
            indices: 'NIFTY_50',
            expiry_date: '0'
        };
        return fetch.post('/quote/', body);
    },
    fetchQuoteByDate: (accessToken, symbol, indices, expiry_date) => {
        const body = {accessToken, symbol, indices, expiry_date};
        return fetch.post('/quote/', body, {headers});
    },
    calStrategy: (body) => fetch.post('/calstrategy/', body, {headers})
};
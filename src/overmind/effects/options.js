import {fetch} from '../../api/server';

const headers = {
    Authorization: 'Token ' + localStorage.getItem('customertoken')
};

export const optionEffects = {
    getQuote: async (token) => {
        const body = {
            accessToken: token,
            symbol: 'NIFTY',
            indices: 'NIFTY_50',
            expiry_date: '0'
        };
        const {data} = await fetch.post('/quote/', body, {headers});
        return data;
    },
    fetchOption: async (actions) => {
        const {data} = await fetch.post('/quote/', actions, {headers});
        return data;
    },
    fetchOptionByDate: async (actions) => {
        const {data} = await fetch.post('/quote/', actions, {headers});
        return data;
    }
};


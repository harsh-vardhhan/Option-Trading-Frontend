import axios from 'axios';

const STAG_URL_HEROKU = 'https://arcane-garden-97275.herokuapp.com';
const STAG_URL_RENDER = 'https://trakbit.onrender.com';
const LOCALHOST = 'http://127.0.0.1:8000/';

const defaultAxiosOptions = {
    baseURL: STAG_URL_RENDER
};

export const fetch = axios.create(defaultAxiosOptions);

import {fetch} from '../server.js';

const headers = {
    Authorization: 'Token ' + localStorage.getItem('customertoken')
};

export const getAccessToken = (token) => {
    const body = {requestcode: token};
    return fetch.post('/accesstoken/', body);
};

export const getRedirectPath = () => {
    const success = res => res;
    const error = errorMsg => errorMsg;
    return fetch('/redirecturl').then(success).catch(error);
};

export const validateToken = (token) =>
    fetch.post('/validatetoken/', {accessToken: token});

export const validateCustomerToken = () =>
    fetch.get('/validatecustomertoken/', {headers});

export const validateProfile = (accessToken, profile) =>
    fetch.post('/validateprofile/', {
        accessToken,
        profile
    });

export const getOrderId = async () => {
    const response = await fetch.get('/orderid/');
    return response.data;
};

export const getUserProfile = async (googleId) => {
    const response = await fetch.post('/userprofile/', {
        googleId
    });
    return response.data;
};

export const generateSignature = (
    paymentId,
    orderId,
    razorpaySignature,
    googleId) =>
    fetch.post('/signature/', {
        paymentId,
        orderId,
        razorpaySignature,
        googleId
    }, {headers});
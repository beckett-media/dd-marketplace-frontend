import axios from 'axios';

export const basePostUrl = 'https://beta.apinouthemes.com'; // API for post
export const baseStoreURL = 'https://beta.apinouthemes.com'; // API for vendor(store)

const baseDomain = 'http://localhost:4000' || 'http://3.139.34.166'; // API for products

const xAppToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiRENHUyIsImlhdCI6MTYwNzg2NDcwMX0.F_3ZTAs_7MbboyzrNCkg0oOyV3yIacP81wee8LPTHJw`;

export const appName = 'dilly_client';

export const customHeaders = {
    Accept: 'application/json',
    'content-type': 'application/json',
    'x-app-token': xAppToken,
};

export const baseUrl = `${baseDomain}`;

const instance = axios.create({
    baseUrl,
    headers: customHeaders,
});

instance.interceptors.request.use(
    (config) => {
        const _xAuthToken =
            localStorage.getItem(`${appName}_xAuthToken`) || null;
        if (_xAuthToken) config.headers['x-auth-token'] = _xAuthToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};

export const getError = (error) => {
    if (error.response) {
        if (error?.response?.data?.data?.errorMessage) {
            return `${error.response.data.data.errorMessage}`;
        } else if (error?.response?.data?.message) {
            return `${error.response.data.message}`;
        }
    } else if (error.request) {
    } else {
        return `${error}`;
    }
};

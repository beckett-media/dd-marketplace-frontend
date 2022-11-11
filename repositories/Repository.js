import axios from 'axios';

export const basePostUrl = 'https://beta.apinouthemes.com'; // API for post
export const baseStoreURL = 'https://beta.apinouthemes.com'; // API for vendor(store)

const xAppToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBOYW1lIjoiRENHUyIsImlhdCI6MTYwNzg2NDcwMX0.F_3ZTAs_7MbboyzrNCkg0oOyV3yIacP81wee8LPTHJw`;

// export const sellerDashboardDomain = 'inspiring-albattani-246423.netlify.app';
// export const sellerDashboardURL =
//     'https://inspiring-albattani-246423.netlify.app';
// export const cardFACURL =
//     'https://duedilly.co/fac-report' ||
//     'https://quirky-panini-a633e8.netlify.app/fac-report';
// const baseDomain = 'https://staging105.botkraft.com';

export const cardFACURL = process.env.NEXT_PUBLIC_CARD_FAC_URL;
export const sellerDashboardDomain = process.env.NEXT_PUBLIC_SELLER_DASHBOARD_DOMAIN;
export const sellerDashboardURL = process.env.NEXT_PUBLIC_SELLER_DASHBOARD_URL;
// const baseDomain = 'https://beta.apinouthemes.com';
const baseDomain = process.env.NEXT_PUBLIC_API_BASE_DOMAIN;
// export const baseDomain = "https://staging.duedilly.co";
// const baseDomain = 'http://127.0.0.1:3000';

export const appName = 'dilly_client';

export const customHeaders = {
    Accept: 'application/json',
    'content-type': 'application/json',
    'x-app-token': xAppToken,
};

export const baseUrl = `${baseDomain}`;
export const s3baseURL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export const s3baseURLThumbnail = process.env.NEXT_PUBLIC_S3_BASE_URL_THUMBNAIL;

const instance = axios.create({
    baseUrl,
    headers: customHeaders,
});

instance.interceptors.request.use(
    (config) => {
        if (!config.doNotUseAuth) {
            const _xAuthToken =
                localStorage.getItem(`${appName}_xAuthToken`) || null;
            if (_xAuthToken) config.headers['x-auth-token'] = _xAuthToken;
        }
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
        } else {
            return error.response;
        }
    } else if (error.request) {
        return error.request;
    } else {
        return `${error}`;
    }
};

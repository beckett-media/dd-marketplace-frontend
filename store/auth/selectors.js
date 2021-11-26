const getData = (state) => state?.auth || {};

export const isUserAuthenticated = (state) => getData(state).isLoggedIn;

export const getUserInfo = (state) => getData(state).user;

const getData = (state) => state.userInfo;

export const getUserInfoLoading = (state) => getData(state).isUserInfoLoading;

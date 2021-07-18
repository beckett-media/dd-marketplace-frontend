const getData = (state) => state.checkout;

export const getSavedAddress = (state) => getData(state).savedAddress;

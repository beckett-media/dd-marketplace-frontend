const getData = (state) => state.checkout;

export const getSavedAddress = (state) => getData(state).savedAddress;

export const getDefaultAddress = (state) => {
    const address = getSavedAddress(state);
    console.log('address: ', address);
    return address.find((i) => i.isDefaultAddress);
};

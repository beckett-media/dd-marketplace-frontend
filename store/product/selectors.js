const getData = (state) => state.product;

export const getListings = (state) => {
    const listings = getData(state).listings;
    return listings;
};

export const getListingsLoading = (state) => {
    const productsLoading = getData(state).productsLoading;
    return productsLoading;
};

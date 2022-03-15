const getData = (state) => state.auction;

export const getAuctionListings = (state) => {
    return getData(state).auctionListings;
};

export const getListingsLoading = (state) => {
    return getData(state).productsLoading;
};

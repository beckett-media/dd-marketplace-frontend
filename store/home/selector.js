const getData = (state) => state.home;

export const getMarketPlaceData = (state) => getData(state).marketPlace;

export const getMarketPlaceLoading = (state) =>
    getData(state).isMarketPlaceLoading;

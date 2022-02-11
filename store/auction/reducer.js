import actionTypes from './actionTypes';

export const initialState = {
    allProducts: null,
    singleProduct: null,
    error: false,
    totalProducts: 0,
    categories: null,
    brands: [],
    productsLoading: true,
    productLoading: true,
    searchResults: null,
    auctionListings: [],
};

function reducer(state = initialState, action) {
    switch (action.type) {
        //new
        case actionTypes.GET_AUCTION_LISTING_BY_PRODUCT_AND_GRADE_SUCCESS:
            const obj = {
                productsLoading:
                    action.loading !== null
                        ? action.loading
                        : state.productsLoading,
                auctionListings: action.payload
                    ? action.payload
                    : state.auctionListings,
            };

            return {
                ...state,
                ...obj,
            };

        //new

        case actionTypes.GET_AUCTION_PRODUCTS_SUCCESS:
            return {
                ...state,
                ...{ allProducts: action.data, productsLoading: false },
            };

        case actionTypes.GET_AUCTION_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                ...{ singleProduct: action.data, productLoading: false },
            };

        case actionTypes.GET_AUCTION_PRODUCTS_ERROR:
            return {
                ...state,
                ...{ error: action.error },
            };

        default:
            return state;
    }
}

export default reducer;

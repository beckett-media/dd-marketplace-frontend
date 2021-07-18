import actionTypes from './actionTypes';

const initState = {
    marketPlace: {
        recommendation: [],
        trendingCards: [],
        trendingPlayers: [],
        newArrival: [],
    },
    isMarketPlaceLoading: true,
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.SET_MARKET_PLACE_DATA:
            return {
                ...state,
                marketPlace: {
                    ...state.marketPlace,
                    ...action.payload,
                },
            };

        case actionTypes.SET_MARKET_PLACE_LOADING:
            return { ...state, isMarketPlaceLoading: action.value };
        default:
            return state;
    }
}

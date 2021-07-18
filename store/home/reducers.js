import actionTypes from './actionTypes';

const initState = {
    marketPlace: {},
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
        default:
            return state;
    }
}

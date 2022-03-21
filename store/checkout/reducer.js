import { RESET_AFTER_CHECKOUT } from '../globalTypes';
import actionTypes from './actionTypes';

const initState = {
    savedAddress: [],
    isCheckoutLoading: false,
    promo: {},
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_SAVED_ADDRESS_SUCCESS:
            return {
                ...state,
                savedAddress: action.address ? action.address : [],
            };
        case actionTypes.HANDLE_CHECKOUT_LOADING:
            return {
                ...state,
                isCheckoutLoading: action.value,
            };
        case actionTypes.PROMO_VALIDATION_SUCCESS:
            return {
                ...state,
                promo: action.promo,
            };
        case actionTypes.RESET_PROMO:
            return {
                ...state,
                promo: {},
            };

        case RESET_AFTER_CHECKOUT:
            return initState;
        default:
            return state;
    }
}

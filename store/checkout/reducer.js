import { RESET_AFTER_CHECKOUT } from '../globalTypes';
import actionTypes from './actionTypes';

const initState = {
    savedAddress: [],
};

export default function reducer(state = initState, action) {
    switch (action.type) {
        case actionTypes.GET_SAVED_ADDRESS_SUCCESS:
            return {
                savedAddress: action.address ? action.address : [],
            };

        case RESET_AFTER_CHECKOUT:
            return initState;
        default:
            return state;
    }
}

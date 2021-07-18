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
        default:
            return state;
    }
}

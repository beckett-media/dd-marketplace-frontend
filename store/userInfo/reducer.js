import actionTypes from "./actionTypes";

export const initState = {
	isUserInfoLoading: true,
};

function reducer(state = initState, action) {
	switch (action.type) {
		case actionTypes.TOGGLE_USER_INFO_LOADING:
			return {
				...state,
				isUserInfoLoading: action.hasOwnProperty("value") ? action.value : !state.isUserInfoLoading,
			};
		default:
			return state;
	}
}

export default reducer;

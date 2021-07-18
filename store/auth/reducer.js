import actionTypes from "./actionTypes";

export const initState = {
	isLoggedIn: false,
	user: null,
};

function reducer(state = initState, action) {
	switch (action.type) {
		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				...{ isLoggedIn: true, user: action.user },
			};
		case actionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				...{ isLoggedIn: false },
			};
		default:
			return state;
	}
}

export default reducer;

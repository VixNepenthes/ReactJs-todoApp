import { LOGIN, LOGOUT, LOGIN_REMEMBERME } from '../actions/userActions';
const initialState = {
	currentUser: null,
	isAuthenticated: false,
	remembermeStatus: false,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				currentUser: action.payload,
				isAuthenticated: true,
				remembermeStatus: false,
			};
		case LOGIN_REMEMBERME:
			return {
				...state,
				currentUser: action.payload,
				isAuthenticated: true,
				remembermeStatus: true,
			};
		case LOGOUT:
			return {
				...state,
				currentUser: null,
				isAuthenticated: false,
				remembermeStatus: false,
			};
		default:
			return state;
	}
}

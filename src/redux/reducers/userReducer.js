import { LOGIN, LOGOUT } from '../actions/userActions';
const initialState = {
	currentUser: null,
	isAuthenticated: false,
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				currentUser: action.payload,
				isAuthenticated: true,
			};
		case LOGOUT:
			return {
				...state,
				currentUser: null,
				isAuthenticated: false,
			};
		default:
			return state;
	}
}

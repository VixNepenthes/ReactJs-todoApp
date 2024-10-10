export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_REMEMBERME = 'LOGIN_REMEMBERME';

export function userLogin(user) {
	return {
		type: LOGIN,
		payload: user,
	};
}

export function userLoginRemember(user) {
	return {
		type: LOGIN_REMEMBERME,
		payload: user,
	};
}

export function userLogout() {
	return {
		type: LOGOUT,
	};
}

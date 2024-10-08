import authorizedAxiosInstance from '../ultis/authorizedAxios';
import { API_ROOT } from '../ultis/constant';
export const loginUserAPI = async (user) => {
	const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, user);
	return response;
};

export async function logoutUserAPI() {
	await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`);
	return;
}

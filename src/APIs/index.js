import authorizedAxiosInstance from '../ultis/authorizedAxios';
import { API_ROOT } from '../ultis/constant';

export const registerUserAPI = async (user) => {
	const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, user);
	return response;
};

export const loginUserAPI = async (user) => {
	const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, user);
	return response;
};

export async function logoutUserAPI() {
	await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`);
	return;
}

export async function refreshTokenAPI() {
	await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/refresh_token`);
	return;
}

export async function fetchTasksByIdAPI(userId) {
	const result = await authorizedAxiosInstance.get(`${API_ROOT}/v1/tasks/gettasksbyid/${userId}`);
	return result.data;
}

export async function addTaskAPI(userId, name) {
	const result = await authorizedAxiosInstance.post(`${API_ROOT}/v1/tasks/addtask/${userId}`, {
		name,
	});
	return result.data;
}

export async function editTaskNameAPI(taskId, name) {
	const result = await authorizedAxiosInstance.patch(`${API_ROOT}/v1/tasks/edittask/${taskId}`, {
		name,
	});
	return result;
}

export async function deleteTaskAPI(taskId) {
	const result = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/tasks/deletetask/${taskId}`);
	return result;
}

export async function checkDoneTaskAPI(taskId) {
	const result = await authorizedAxiosInstance.patch(
		`${API_ROOT}/v1/tasks/checkdonetask/${taskId}`
	);
	return result;
}

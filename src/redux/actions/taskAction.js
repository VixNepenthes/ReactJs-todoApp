import { fetchTasksByIdAPI } from '../../APIs';
export const FETCH_TASKS_REQUEST = 'FETCH_TASK_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASK_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASK_FAILURE';
export const FILTER_TASKS = 'FILTER_TASKS';
function fetchTasksRequest() {
	return {
		type: FETCH_TASKS_REQUEST,
	};
}

function fetchTasksSucess(data) {
	return {
		type: FETCH_TASKS_SUCCESS,
		payload: data,
	};
}

function fetchTasksFailure(error) {
	return {
		type: FETCH_TASKS_FAILURE,
		payload: error,
	};
}

export function filterTasks(filterStatus) {
	return {
		type: FILTER_TASKS,
		payload: filterStatus,
	};
}

export function fetchTasks() {
	return async (dispatch, getState) => {
		const state = getState();
		const currentUser = state.user.currentUser;
		dispatch(fetchTasksRequest);
		const result = await fetchTasksByIdAPI(currentUser.id);
		dispatch(fetchTasksSucess(result));
	};
}

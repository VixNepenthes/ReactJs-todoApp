import { filter } from '@chakra-ui/react';
import {
	FETCH_TASKS_FAILURE,
	FETCH_TASKS_REQUEST,
	FETCH_TASKS_SUCCESS,
	FILTER_TASKS,
} from '../actions/taskAction';

const initialState = {
	taskList: [],
	filteredTaskList: [],
	filter: 'all',
	loading: false,
	error: '',
};

export default function taskReducer(state = initialState, action) {
	switch (action.type) {
		case FETCH_TASKS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_TASKS_SUCCESS:
			return {
				...state,
				loading: false,
				taskList: action.payload,
				filteredTaskList: action.payload,
				filter: 'all',
				error: '',
			};
		case FETCH_TASKS_FAILURE:
			return {
				...state,
				loading: false,
				taskList: [],
				error: action.payload,
			};
		case FILTER_TASKS:
			const filteredList = state.taskList.filter((task) => {
				if (action?.payload === 'Done') return task.completed;
				if (action?.payload === 'Undone') return !task.completed;
				return true;
			});
			return {
				...state,
				filteredTaskList: filteredList,
				filter: action.payload,
			};
		default:
			return state;
	}
}

import { Button, HStack, Input } from '@chakra-ui/react';
import { CgAddR } from 'react-icons/cg';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskAPI } from '../../APIs';
import { fetchTasks, filterTasks } from '../../redux/actions/taskAction';
const AddNewTask = () => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const isLoading = useSelector((state) => state.task.loading);
	const dispatch = useDispatch();
	const [taskName, setTaskName] = useState('');
	async function handleAddTask() {
		const result = await addTaskAPI(currentUser.id, taskName.trim());
		toast.success(result.message);
		dispatch(fetchTasks());
		setTaskName('');
	}
	function handleClear() {
		setTaskName('');
	}
	return (
		<HStack
			className='add-new-task__container'
			justify='space-between'
			w='100%'
		>
			<HStack
				className='add-new-task__left-section'
				justify='center'
				align='center'
			>
				<CgAddR className='add-new-task__icon' />
				<Input
					variant='unstyled'
					placeholder='Add new task...'
					value={taskName}
					onChange={(e) => setTaskName(e.target.value)}
					className='add-new-task__input'
				/>
			</HStack>
			{taskName.trim() === '' ? (
				<HStack className='add-new-task__right-section'>
					<Button
						colorScheme='teal'
						className='add-new-task__button'
						isDisabled
					>
						Add new
					</Button>
				</HStack>
			) : (
				<HStack className='add-new-task__right-section'>
					<Button
						colorScheme='teal'
						className='add-new-task__button'
						onClick={handleAddTask}
						isLoading={isLoading}
					>
						Add new
					</Button>
					<Button
						colorScheme='red'
						onClick={handleClear}
					>
						Cancel
					</Button>
				</HStack>
			)}
		</HStack>
	);
};

export default AddNewTask;

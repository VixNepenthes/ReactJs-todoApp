import { Button, Card, Checkbox, HStack, Input, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { checkDoneTaskAPI, deleteTaskAPI, editTaskNameAPI } from '../../APIs';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { fetchTasks } from '../../redux/actions/taskAction';
import { HttpStatusCode } from 'axios';

const Task = ({ task }) => {
	const [taskName, setTaskName] = useState(task.name);
	const [isEditing, setIsEditing] = useState(false);
	const [isLoadingEdit, setIsLoadingEdit] = useState(false);
	const [isLoadingDelete, setIsLoadingDelete] = useState(false);

	const dispatch = useDispatch();

	async function handleEdit(taskId) {
		setIsLoadingEdit(true);
		const result = await editTaskNameAPI(taskId, taskName);
		if (result.status === HttpStatusCode.NoContent) {
			toast.success('Edit success');
		}
		dispatch(fetchTasks());
		setIsEditing(!isEditing);
		setIsLoadingEdit(false);
	}

	async function handleDelete(taskId) {
		setIsLoadingDelete(true);
		const result = await deleteTaskAPI(taskId);
		if (result.status === HttpStatusCode.NoContent) {
			toast.success('Delete success');
		}
		setIsLoadingDelete(false);
		dispatch(fetchTasks());
	}

	async function handleCheckDone(taskId) {
		const result = await checkDoneTaskAPI(taskId);
		if (result.status === HttpStatusCode.NoContent) {
			toast.success('Check Done success');
		}
		dispatch(fetchTasks());
	}

	return (
		<Card
			display='flex'
			direction='row'
			className='task__container'
			w='100%'
			justify='space-between'
			p='24px'
			borderRadius='12px'
			height='72px'
			backgroundColor='#F9FAFB'
			border={isEditing ? '1px solid teal' : 'none'}
		>
			<HStack className='task__left-container'>
				<Checkbox
					colorScheme='teal'
					isChecked={task.completed}
					onChange={() => handleCheckDone(task._id)}
					className='task__checkbox'
				/>
				{isEditing ? (
					<Input
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
					/>
				) : (
					<Text
						colorScheme='black'
						as={task.completed ? 'del' : 'p'}
						fontSize='16px'
					>
						{taskName}
					</Text>
				)}
			</HStack>
			{isEditing ? (
				<HStack
					className='task__right-container'
					h='32px'
					gap='8px'
				>
					<Button
						h='32px'
						p='12px'
						colorScheme='teal'
						variant='outline'
						onClick={() => handleEdit(task._id)}
						className='task__edit-button'
						isLoading={isLoadingEdit}
					>
						Save
					</Button>
					<Button
						h='32px'
						p='12px'
						colorScheme='red'
						variant='outline'
						onClick={() => setIsEditing(!isEditing)}
						className='task__delete-button'
					>
						Cancel
					</Button>
				</HStack>
			) : (
				<HStack
					className='task__right-container'
					h='32px'
					gap='8px'
				>
					<Button
						h='32px'
						p='12px'
						colorScheme='teal'
						variant='outline'
						onClick={() => setIsEditing(!isEditing)}
						className='task__edit-button'
						isDisabled={task.completed ? true : false}
					>
						Edit
					</Button>
					<Button
						h='32px'
						p='12px'
						colorScheme='red'
						variant='outline'
						onClick={() => handleDelete(task._id)}
						className='task__delete-button'
						isLoading={isLoadingDelete}
					>
						Delete
					</Button>
				</HStack>
			)}
		</Card>
	);
};

export default Task;

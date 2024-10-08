import { Button, Card, Checkbox, HStack, Input, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';

const Task = ({ task, undone = true }) => {
	const [taskName, setTaskName] = React.useState(task.name);
	const [checkDone, setCheckDone] = React.useState(false);
	const [isEditing, setIsEditing] = React.useState(false);
	useEffect(() => {
		if (!undone) {
			setCheckDone(true);
		}
	}, []);
	function handleEdit(taskId) {
		console.log('Edit', taskId);
		setIsEditing(!isEditing);
	}
	function handleDelete(taskId) {
		console.log('Delete', taskId);
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
					isChecked={checkDone}
					onChange={(e) => setCheckDone(e.target.checked)}
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
						as={checkDone ? 'del' : 'p'}
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
						onClick={() => handleEdit(task.id)}
						className='task__edit-button'
						isDisabled={checkDone ? true : false}
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
						isDisabled={checkDone ? true : false}
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
						isDisabled={checkDone ? true : false}
					>
						Edit
					</Button>
					<Button
						h='32px'
						p='12px'
						colorScheme='red'
						variant='outline'
						onClick={() => handleDelete(task.id)}
						className='task__delete-button'
						isDisabled={checkDone ? true : false}
					>
						Delete
					</Button>
				</HStack>
			)}
		</Card>
	);
};

export default Task;

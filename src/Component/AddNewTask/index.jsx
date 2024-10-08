import { Button, HStack, Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';
import { CgAddR } from 'react-icons/cg';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
const AddNewTask = () => {
	const [taskName, setTaskName] = useState('');
	function handleAddTask() {
		toast.success(taskName.trim());
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

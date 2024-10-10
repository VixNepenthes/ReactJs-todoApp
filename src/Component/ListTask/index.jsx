import { List, ListItem } from '@chakra-ui/react';
import React from 'react';
import Task from '../Task';
import { useSelector } from 'react-redux';

const ListTask = () => {
	const filteredList = useSelector((state) => state.task.filteredTaskList);
	return (
		<List
			w='100%'
			maxHeight='500px'
			overflowY='auto'
			gap='20px'
			display='flex'
			flexDirection='column'
		>
			{filteredList.map((task) => (
				<ListItem key={task._id}>
					<Task task={task} />
				</ListItem>
			))}
		</List>
	);
};

export default ListTask;

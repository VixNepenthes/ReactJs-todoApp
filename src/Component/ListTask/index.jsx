import { List, ListItem, VStack } from '@chakra-ui/react';
import React from 'react';
import Task from '../Task';

const ListTask = () => {
	return (
		<List
			w='100%'
			maxHeight='500px'
			overflowY='auto'
			gap='20px'
			display='flex'
			flexDirection='column'
		>
			<ListItem>
				<Task
					task={{ name: 'Hello World' }}
					undone={true}
				/>
			</ListItem>
		</List>
	);
};

export default ListTask;

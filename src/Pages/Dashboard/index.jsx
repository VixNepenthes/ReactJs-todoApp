import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authorizedAxiosInstance from '../../ultis/authorizedAxios';
import { API_ROOT } from '../../ultis/constant';
import {
	Box,
	Center,
	CircularProgress,
	Container,
	Divider,
	Flex,
	VStack,
	Text,
} from '@chakra-ui/react';
import AddNewTask from '../../Component/AddNewTask';
import Filter from '../../Component/Filter';
import Header from '../../Component/Header';
import ListTask from '../../Component/ListTask';
import { fetchTasks } from '../../redux/actions/taskAction';

const Dashboard = () => {
	const loading = useSelector((state) => state.task.loading);
	const remembermeStatus = useSelector((state) => state.user.remembermeStatus);
	console.log(remembermeStatus);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchTasks());
	}, []);
	return (
		<>
			{loading ? (
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					gap='2'
					w='100vw'
					h='100vh'
					color='black'
				>
					<CircularProgress />
					<Text fontSize='5xl'>Loading...</Text>
				</Box>
			) : (
				<Box
					m='auto'
					display='flex'
					justifyContent='center'
					alignItems='center'
					w='67%'
					h='85.3%'
				>
					<Center
						mt='80px'
						h='100%'
						w='100%'
						backgroundColor='white'
						borderRadius='20px'
						padding='40px 60px'
					>
						<VStack
							w='100%'
							gap='20px'
							h='100%'
						>
							<Header />
							<AddNewTask />
							<Divider />
							<Filter />
							<ListTask />
						</VStack>
					</Center>
				</Box>
			)}
		</>
	);
};

export default Dashboard;

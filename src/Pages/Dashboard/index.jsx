import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';
import authorizedAxiosInstance from '../../ultis/authorizedAxios';
import { API_ROOT } from '../../ultis/constant';
import { Container, List, Divider, VStack } from '@chakra-ui/react';
import AddNewTask from '../../Component/AddNewTask';
import Filter from '../../Component/Filter';
import Task from '../../Component/Task';
import Header from '../../Component/Header';
import avatar from '../../assets/mock_avatar.jpg';
import ListTask from '../../Component/ListTask';

const Dashboard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchData() {
			const result = await authorizedAxiosInstance.get(`${API_ROOT}/v1/dashboards/access`);
			console.log(result.data);
		}
		fetchData();
	}, []);

	return (
		<Container
			mt={10}
			size='lg'
			minHeight={600}
			backgroundColor='white'
		>
			<VStack gap='20px'>
				<Header
					imageUser={avatar}
					userName={'Huỳnh Tiến Vĩ'}
				/>
				<AddNewTask />
				<Divider />
				<Filter />
				<ListTask />
			</VStack>
		</Container>
	);
};

export default Dashboard;

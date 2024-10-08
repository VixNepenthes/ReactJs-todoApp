import React from 'react';
import './App.css';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Dashboard from '../Pages//Dashboard/index.jsx';
import Register from '../Pages//Register';
import Error from '../Pages//Error';
import { useSelector } from 'react-redux';
import Layout from '../Layout/index.jsx';
const App = () => {
	const currentUser = useSelector((state) => state.user.currentUser);
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

	const ProtectedRoutes = () => {
		if (isAuthenticated) {
			return <Outlet />;
		} else {
			return (
				<Navigate
					to='/login'
					replace={true}
				/>
			);
		}
	};

	const UnauthorizedRoutes = () => {
		if (isAuthenticated) {
			return (
				<Navigate
					to='/'
					replace={true}
				/>
			);
		} else {
			return <Outlet />;
		}
	};

	return (
		<Routes>
			<Route
				path='/'
				element={<Layout />}
			>
				<Route element={<ProtectedRoutes />}>
					<Route
						index
						element={<Dashboard />}
					/>
				</Route>
				<Route element={<UnauthorizedRoutes />}>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
				</Route>
				<Route
					path='*'
					element={<Error />}
				/>
			</Route>
		</Routes>
	);
};

export default App;

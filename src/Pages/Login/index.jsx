import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { loginUserAPI } from '../../APIs';
import { HiOutlineMail } from 'react-icons/hi';
import {
	Container,
	Heading,
	Text,
	Box,
	VStack,
	HStack,
	FormErrorMessage,
	FormLabel,
	FormControl,
	Input,
	Button,
	InputGroup,
	InputLeftElement,
	InputRightElement,
	Switch,
} from '@chakra-ui/react';
import authorizedAxiosInstance from '../../ultis/authorizedAxios';
import { API_ROOT } from '../../ultis/constant';
const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm();
	const dispatch = useDispatch();
	const [show, setShow] = React.useState(false);
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const checkVarUser = {
			email: data.email,
			password: data.password,
		};

		const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, checkVarUser);
		// lưu JWT token vào localStorage
		// const userInfo = {
		// 	email: response?.data?.email,
		// 	id: response?.data?.id,
		// };
		// localStorage.setItem('accessToken', response.data.accessToken);
		// localStorage.setItem('refreshToken', response.data.refreshToken);
		// localStorage.setItem('userInfo', JSON.stringify(userInfo));
		if (response) {
			toast.success('Success');
			dispatch(userLogin(checkVarUser));
			navigate('/', { replace: true });
			return;
		}
	};

	return (
		<Container
			mt={10}
			size='md'
			minHeight={600}
			backgroundColor='white'
		>
			<VStack spacing={10}>
				<VStack
					spacing={2}
					alignContent='flex-start'
				>
					<Heading>Hello</Heading>
					<Text>Welcome to todoApp Videv</Text>
				</VStack>

				<form onSubmit={handleSubmit(onSubmit)}>
					<VStack spacing={2}>
						<FormControl isInvalid={errors.email}>
							<FormLabel htmlFor='email'>Email</FormLabel>
							<InputGroup>
								<InputLeftElement pointerEvents='none'>
									<HiOutlineMail />
								</InputLeftElement>
								<Input
									w={300}
									id='email'
									placeholder='email'
									{...register('email', {
										required: 'This is required',
										pattern: {
											value: /\S+@\S+\.\S+/,
											message: 'Entered value does not match email format',
										},
									})}
								/>
							</InputGroup>
							<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errors.password}>
							<FormLabel htmlFor='password'>Password</FormLabel>
							<InputGroup>
								<Input
									type={show ? 'text' : 'password'}
									id='password'
									placeholder='password'
									{...register('password', {
										required: 'This is required',
										minLength: { value: 8, message: 'Minimum length should be 8' },
									})}
								/>
								<InputRightElement w='4.5rem'>
									<Button
										h='1.75rem'
										size='sm'
										onClick={() => setShow(!show)}
									>
										{show ? 'Hide' : 'Show'}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
						</FormControl>
						<FormControl
							display='flex'
							alignItems='center'
						>
							<FormLabel
								htmlFor='email-alerts'
								mb='0'
							>
								Remember Me?
							</FormLabel>
							<Switch id='email-alerts' />
						</FormControl>
						<Box>
							<Button
								mt={4}
								colorScheme='purple'
								isLoading={isSubmitting}
								type='submit'
							>
								Login
							</Button>
						</Box>
					</VStack>
				</form>
				<HStack>
					<Text>
						Don't have an account?{' '}
						<Link to='/register'>
							<Button
								colorScheme='teal'
								variant='link'
							>
								Register Here
							</Button>
						</Link>
					</Text>
				</HStack>
			</VStack>
		</Container>
	);
};

export default Login;

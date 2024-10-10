import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin, userLoginRemember } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
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
	Stack,
	Center,
	Flex,
	Checkbox,
} from '@chakra-ui/react';
import authorizedAxiosInstance from '../../ultis/authorizedAxios';
import { API_ROOT } from '../../ultis/constant';
import { RiLockPasswordFill } from 'react-icons/ri';
const Login = () => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm();
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [rememberMe, setRememberMe] = useState(true);

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const checkVarUser = {
			email: data.email,
			password: data.password,
		};

		const result = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, checkVarUser);
		// lưu JWT token vào localStorage
		// const userInfo = {
		// 	email: response?.data?.email,
		// 	id: response?.data?.id,
		// };
		// localStorage.setItem('accessToken', response.data.accessToken);
		// localStorage.setItem('refreshToken', response.data.refreshToken);
		// localStorage.setItem('userInfo', JSON.stringify(userInfo));
		toast.success('Success');
		const existedUser = {
			id: result.data.id,
			email: result.data.email,
			fullname: result.data.fullname,
		};
		rememberMe ? dispatch(userLoginRemember(existedUser)) : dispatch(userLogin(existedUser));
		navigate('/', { replace: true });
		return;
	};

	return (
		<Flex
			w='100vw'
			h='100vh'
		>
			<Center flex='6'>
				<VStack
					spacing={2}
					w='100%'
					color='white'
					position='relative'
					right='120px'
				>
					<Heading
						fontSize='48px'
						fontWeight='700'
					>
						Todo App
					</Heading>
					<Text
						fontSize='18px'
						fontWeight='500'
					>
						Manage your work every day
					</Text>
				</VStack>
			</Center>
			<Center
				flex='4'
				backgroundColor='white'
				textAlign='left'
			>
				<VStack spacing={10}>
					<VStack
						spacing={2}
						w='100%'
						alignItems='flex-start'
					>
						<Heading
							fontSize='30px'
							fontWeight='700'
						>
							Welcome back!
						</Heading>
						<Text
							fontSize='18px'
							fontWeight='500'
						>
							Login to Get Started
						</Text>
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
									<InputLeftElement pointerEvents='none'>
										<RiLockPasswordFill />
									</InputLeftElement>
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
								mt='16px'
								gap='8px'
							>
								<Checkbox
									id='rememberMe__checkbox'
									isChecked={rememberMe}
									onChange={() => setRememberMe(!rememberMe)}
									colorScheme='teal'
								/>
								<FormLabel
									mb='0'
									htmlFor='rememberMe__checkbox'
								>
									Remember Me?
								</FormLabel>
							</FormControl>

							<Box
								w='100%'
								mt='10px'
							>
								<Button
									w='100%'
									colorScheme='teal'
									isLoading={isSubmitting}
									type='submit'
								>
									Login
								</Button>
							</Box>
						</VStack>
					</form>
					<HStack mt='-10px'>
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
			</Center>
		</Flex>
	);
};

export default Login;

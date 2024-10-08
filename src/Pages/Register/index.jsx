import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
const Register = () => {
	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [showRePassword, setShowRePassword] = useState(false);

	const navigate = useNavigate();

	const onSubmit = async (data) => {
		if (data.password !== data.rePassword) {
			
			setValue('password', '');
			setValue('rePassword', '');
			toast.error('Password not matched! Please enter again');
			return;
		}
		const checkVarUser = {
			email: data.email,
			password: data.password,
		};
		let response = null;
		try {
			response = await loginUserAPI(checkVarUser);
			if (response.status >= 200 && response.status <= 299) {
				console.log(response.data);
				toast.success('Login successful');
				dispatch(userLogin(checkVarUser));
				navigate('/', { replace: true });
				return;
			}
		} catch (error) {
			toast.error(`${error.response.status} ${error.response.data}`);
			return;
		}
		return;
	};

	return (
		<Container
			mt={10}
			size='md'
			minHeight={600}
			colorScheme='purple'
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
									type={showPassword ? 'text' : 'password'}
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
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? 'Hide' : 'Show'}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errors.rePassword}>
							<FormLabel htmlFor='rePassword'>Confirm Password</FormLabel>
							<InputGroup>
								<Input
									type={showRePassword ? 'text' : 'password'}
									id='rePassword'
									placeholder='Confirm password'
									{...register('rePassword', {
										required: 'This is required',
										minLength: { value: 8, message: 'Minimum length should be 8' },
									})}
								/>
								<InputRightElement w='4.5rem'>
									<Button
										h='1.75rem'
										size='sm'
										onClick={() => setShowRePassword(!showRePassword)}
									>
										{showRePassword ? 'Hide' : 'Show'}
									</Button>
								</InputRightElement>
							</InputGroup>
							<FormErrorMessage>{errors.rePassword && errors.rePassword.message}</FormErrorMessage>
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
								Register
							</Button>
						</Box>
					</VStack>
				</form>
				<HStack>
					<Text>
						Already have an account?{' '}
						<Link to='/login'>
							<Button
								colorScheme='teal'
								variant='link'
							>
								Login Here
							</Button>
						</Link>
					</Text>
				</HStack>
			</VStack>
		</Container>
	);
};

export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { registerUserAPI } from '../../APIs';
import { HiOutlineMail } from 'react-icons/hi';
import {
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
	Flex,
	Center,
} from '@chakra-ui/react';
import { IoMdPerson } from 'react-icons/io';
import { RiLockPasswordFill } from 'react-icons/ri';
import { GiConfirmed } from 'react-icons/gi';
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
			fullname: data.fullname,
			password: data.password,
		};
		let response = null;
		try {
			response = await registerUserAPI(checkVarUser);
			if (response.status >= 200 && response.status <= 299) {
				console.log(response.data);
				toast.success('Register successful');
				navigate('/login', { replace: true });
				return;
			}
		} catch (error) {
			toast.error(`${error.response.status} ${error.response.data}`);
			return;
		}
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
							Hello!
						</Heading>
						<Text
							fontSize='18px'
							fontWeight='500'
						>
							Sign Up to Get Started
						</Text>
					</VStack>

					<form onSubmit={handleSubmit(onSubmit)}>
						<VStack spacing={2}>
							<FormControl isInvalid={errors.fullname}>
								<FormLabel htmlFor='fullname'>Fullname</FormLabel>
								<InputGroup>
									<InputLeftElement pointerEvents='none'>
										<IoMdPerson />
									</InputLeftElement>
									<Input
										w={300}
										id='fullname'
										placeholder='Enter your name'
										{...register('fullname', {
											required: 'This is required',
										})}
									/>
								</InputGroup>
								<FormErrorMessage>{errors.fullname && errors.fullname.message}</FormErrorMessage>
							</FormControl>
							<FormControl isInvalid={errors.email}>
								<FormLabel htmlFor='email'>Email</FormLabel>
								<InputGroup>
									<InputLeftElement pointerEvents='none'>
										<HiOutlineMail />
									</InputLeftElement>
									<Input
										w={300}
										id='email'
										placeholder='Enter your email'
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
										type={showPassword ? 'text' : 'password'}
										id='password'
										placeholder='Enter at least 8 characters'
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
									<InputLeftElement pointerEvents='none'>
										<GiConfirmed />
									</InputLeftElement>
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
								<FormErrorMessage>
									{errors.rePassword && errors.rePassword.message}
								</FormErrorMessage>
							</FormControl>

							<Box
								w='100%'
								mt='20px'
							>
								<Button
									w='100%'
									mt={4}
									colorScheme='teal'
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
			</Center>
		</Flex>
	);
};

export default Register;

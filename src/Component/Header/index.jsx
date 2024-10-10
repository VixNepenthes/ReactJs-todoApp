import { Box, Button, Flex, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/actions/userActions';
import { logoutUserAPI } from '../../APIs';
import { toast } from 'react-toastify';
const Header = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.user.currentUser);
	async function handleLogOut() {
		await logoutUserAPI();
		toast.success('Goodbye');
		dispatch(userLogout());
	}
	return (
		<HStack
			className='header__container'
			justify='space-between'
			alignItems='center'
			w='100%'
		>
			<VStack className='header__left-container'>
				<HStack className='user__container'>
					<Text
						alignSelf='flex-start'
						size={30}
						fontWeight='700'
					>
						Welcome,
					</Text>
					<Text
						as='b'
						fontWeight='600'
						className='user__name'
						size={18}
					>
						{currentUser.fullname}
					</Text>
				</HStack>
			</VStack>
			<Flex
				className='header__right-container'
				justify='center'
				align='center'
			>
				<IconButton
					_hover={{ backgroundColor: 'gray.600' }}
					isRound={true}
					size={'xs'}
					className='button__log-out'
					icon={<IoIosLogOut />}
					backgroundColor='gray.800'
					color='white'
					onClick={handleLogOut}
				/>
			</Flex>
		</HStack>
	);
};

export default Header;

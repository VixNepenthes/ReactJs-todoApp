import { Box, Button, HStack, IconButton, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { IoIosLogOut } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/actions/userActions';
import { replace, useNavigate } from 'react-router-dom';
import authorizedAxiosInstance from '../../ultis/authorizedAxios';
import { API_ROOT } from '../../ultis/constant';
import { logoutUserAPI } from '../../APIs';
import { toast } from 'react-toastify';
const Header = ({ imageUser, userName }) => {
	const dispatch = useDispatch();
	async function handleLogOut() {
		await logoutUserAPI();
		toast.success('Goodbye');
		dispatch(userLogout());
	}
	return (
		<HStack
			className='header__container'
			justify='space-between'
			w='100%'
		>
			<VStack className='header__left-container'>
				<HStack className='user__container'>
					<Image
						borderRadius='full'
						boxSize='21px'
						className='user__avatar'
						src={imageUser}
					/>
					<Text
						as='b'
						fontWeight='600'
						className='user__name'
						size={18}
					>
						{userName}
					</Text>
				</HStack>
				<Text
					alignSelf='flex-start'
					size={30}
					fontWeight='700'
				>
					Welcome
				</Text>
			</VStack>
			<Box
				className='header__right-container'
				alignSelf='flex-start'
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
			</Box>
		</HStack>
	);
};

export default Header;

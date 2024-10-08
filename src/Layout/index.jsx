import { Box } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import React from 'react';
import { Outlet } from 'react-router-dom';
const Layout = () => {
	return (
		<Box
			position='relative'
			h='100vh'
			w='100vw'
			p={4}
			bgColor='#319795'
		>
			<Outlet />
			<ColorModeSwitcher
				position='fixed'
				bottom={3}
				left={3}
			/>
		</Box>
	);
};

export default Layout;

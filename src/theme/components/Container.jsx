import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const baseStyle = {
	borderRadius: 'xl', // add a border radius
	fontWeight: 'small', // change the font weight
};

const sizes = {
	sm: defineStyle({
		maxW: '45ch',
		p: '4',
	}),
	md: defineStyle({
		maxW: 'container.sm',
		p: '6',
		fontSize: 'lg',
	}),
	lg: defineStyle({
		maxW: '75ch',
		p: '8',
		fontSize: 'xl',
	}),
};

const colorfulVariant = defineStyle((props) => {
	const { colorScheme } = props; // add color scheme as a prop
	return {
		_light: {
			bg: `${colorScheme}.000`,
			color: `${colorScheme}.800`,
		},
		_dark: {
			bg: `${colorScheme}.900`,
			color: `${colorScheme}.200`,
		},
	};
});

const variants = {
	colorful: colorfulVariant,
};

const defaultProps = {
	size: 'md',
	variant: 'colorful',
	colorScheme: 'brand',
};

// export the component theme
export const containerTheme = defineStyleConfig({
	baseStyle,
	sizes,
	variants,
	defaultProps,
});

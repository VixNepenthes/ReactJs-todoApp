import { extendTheme } from '@chakra-ui/react';
import { containerTheme } from './components/Container';

const theme = extendTheme({
	colors: {
		brand: {
			50: '#dafff3',
			100: '#adffe2',
			200: '#7dfed5',
			300: '#4efeca',
			400: '#25fec3',
			500: '#13e4b1',
			600: '#01b18f',
			700: '#007f5d',
			800: '#004d32',
			900: '#001b0e',
		},
	},
	components: {
		Container: containerTheme,
	},
});

export default theme;

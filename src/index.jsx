import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store.js';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import theme from './theme/index.jsx';
import { PersistGate } from 'redux-persist/integration/react';
const root = createRoot(document.getElementById('app'));

root.render(
	<BrowserRouter>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<ChakraProvider theme={theme}>
					<CSSReset />
					<App />
					<ToastContainer position='bottom-right' />
				</ChakraProvider>
			</PersistGate>
		</Provider>
	</BrowserRouter>
);

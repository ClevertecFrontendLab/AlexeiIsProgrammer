import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from '~/store/configure-store.ts';

import CustomAlert from './components/CustomAlert';
import Router from './router/Router';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider
                resetCSS
                theme={theme}
                toastOptions={{
                    defaultOptions: {
                        render: ({ onClose }) => (
                            <CustomAlert
                                onClose={onClose}
                                title='Ошибка сервера'
                                description='Попробуйте немного позже'
                                status='error'
                            />
                        ),
                        position: 'bottom',
                        duration: 5000,
                    },
                }}
            >
                <Router />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);

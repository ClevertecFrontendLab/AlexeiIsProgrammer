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
                        render: ({ onClose, status, title, description }) => (
                            <CustomAlert
                                onClose={onClose}
                                title={title}
                                description={description}
                                status={status}
                            />
                        ),
                        position: 'bottom',
                        duration: 20000,
                    },
                }}
            >
                <Router />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);

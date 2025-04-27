import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router';

import { store } from '~/store/configure-store.ts';

import { routes } from './routes';
import theme from './theme';

const router = createHashRouter(routes);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider resetCSS theme={theme}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);

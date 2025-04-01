import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router';

import App from '~/app/App.tsx';
import { store } from '~/store/configure-store.ts';

import theme from './theme';

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <div>Main</div> },
            { path: 'vegan', element: <div>Веганская кухня</div> },
            { path: 'juice', element: <div>Самое сочное</div> },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider resetCSS theme={theme}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);

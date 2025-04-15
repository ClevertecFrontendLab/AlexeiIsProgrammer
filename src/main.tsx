import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router';

import App from '~/app/App.tsx';
import { store } from '~/store/configure-store.ts';

import HomePage from './pages/Home';
import theme from './theme';

export const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'juciest', label: 'Самое сочное', element: <HomePage /> },
            { path: 'vegan-cuisine', label: 'Веганская кухня', element: <HomePage /> },
        ],
    },
];

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

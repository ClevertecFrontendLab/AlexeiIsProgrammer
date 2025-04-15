import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouteObject, RouterProvider } from 'react-router';

import App from '~/app/App.tsx';
import { store } from '~/store/configure-store.ts';

import HomePage from './pages/Home';
import theme from './theme';
import flatten from './utils/flatten';

export type AppRoute = RouteObject & {
    path?: string;
    element?: ReactElement;
    index?: boolean;
    label?: string;
    children?: (RouteObject & AppRoute)[];
};

export const routes: AppRoute[] = [
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'juciest', label: 'Самое сочное', element: <HomePage /> },
            {
                path: 'vegan-cuisine',
                label: 'Веганская кухня',
                element: <HomePage />,
                children: [
                    { label: 'Закуски', path: 'zakuski', element: <HomePage /> },
                    { label: 'Первые блюда', path: 'pervye-blyuda', element: <HomePage /> },
                    { label: 'Вторые блюда', path: 'vtorye-blyuda', element: <HomePage /> },
                    { label: 'Гарниры', path: 'garniry', element: <HomePage /> },
                    { label: 'Десерты', path: 'deserty', element: <HomePage /> },
                    { label: 'Выпечка', path: 'vypechka', element: <HomePage /> },
                    {
                        label: 'Сыроедческие блюда',
                        path: 'syroedcheskie-blyuda',
                        element: <HomePage />,
                    },
                    { label: 'Напитки', path: 'napitki', element: <HomePage /> },
                ],
            },
        ],
    },
];

export const flattenRoutes = flatten(routes);

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

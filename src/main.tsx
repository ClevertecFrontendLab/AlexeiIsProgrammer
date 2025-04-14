import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createHashRouter, RouterProvider } from 'react-router';

import App from '~/app/App.tsx';
import { store } from '~/store/configure-store.ts';

import CategoryPage from './pages/Category';
import FavoritesPage from './pages/Favorites';
import HomePage from './pages/Home';
import PopularPage from './pages/Popular';
import RecipePage from './pages/Recipe';
import theme from './theme';

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'recipe/:id', element: <RecipePage /> },
            { path: 'zakuski', element: <CategoryPage /> },
            { path: 'popular', element: <PopularPage /> },
            { path: 'favorites', element: <FavoritesPage /> },
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

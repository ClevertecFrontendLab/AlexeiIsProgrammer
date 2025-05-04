import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import App from '~/app/App';
import Recipe from '~/pages/Recipe';
import {
    AppRoute,
    transformMenuToRoutes,
    useGetCategoriesQuery,
} from '~/query/services/categories';

const Router = () => {
    const { data: routes, isLoading } = useGetCategoriesQuery();

    const transformedRoutes = useMemo(() => routes?.map(transformMenuToRoutes) || [], [routes]);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [...transformedRoutes],
        },
        {
            path: ':category/:subCategory/:recipeId',
            element: <Recipe />,
        },
    ] as AppRoute[]);

    return isLoading ? <h1>Загрузка...</h1> : <RouterProvider router={router} />;
};

export default Router;

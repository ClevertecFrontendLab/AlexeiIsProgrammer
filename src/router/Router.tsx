import { useMemo } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router';

import App from '~/app/App';
import Juciest from '~/components/Juciest';
import Layout from '~/components/Layout';
import Error from '~/pages/Error';
import Recipe from '~/pages/Recipe';
import {
    AppRoute,
    transformMenuToRoutes,
    useGetCategoriesQuery,
} from '~/query/services/categories';

const Router = () => {
    const { data: routes } = useGetCategoriesQuery();

    const transformedRoutes = useMemo(() => routes?.map(transformMenuToRoutes) || [], [routes]);

    const router = useMemo(
        () =>
            createBrowserRouter([
                {
                    path: '/',
                    element: (
                        <Layout>
                            <Outlet />
                        </Layout>
                    ),
                    errorElement: <Navigate to='not-found' />,
                    children: [
                        {
                            path: '/',
                            element: <App />,
                            children: [
                                ...transformedRoutes,
                                {
                                    path: 'the-juiciest',
                                    element: <Juciest />,
                                },
                            ],
                        },
                        {
                            path: ':category/:subCategory/:recipeId',
                            element: <Recipe />,
                        },
                    ],
                },
                {
                    path: 'not-found',
                    element: (
                        <Layout>
                            <Error />,
                        </Layout>
                    ),
                },
            ] as AppRoute[]),
        [transformedRoutes],
    );

    return <RouterProvider router={router} />;
};

export default Router;

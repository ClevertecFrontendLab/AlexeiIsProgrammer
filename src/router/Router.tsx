import { useMemo } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router';

import App from '~/app/App';
import Auth from '~/components/Auth';
import Juciest from '~/components/Juciest';
import Layout from '~/components/Layout';
import Subcategory from '~/components/Subcategory';
import Tabbed from '~/components/Tabbed';
import Error from '~/pages/Error';
import Recipe from '~/pages/Recipe';
import { AppRoute } from '~/query/services/categories';

import {
    CATEGORY,
    LOGIN,
    MAIN,
    NOT_FOUND,
    RECIPE_ID,
    REGISTRATION,
    SUBCATEGORY,
    THE_JUICIEST,
    VERIFICATION,
} from './constants/routes';
import { PrivateRoute } from './PrivateRoute';

const Router = () => {
    const router = useMemo(
        () =>
            createBrowserRouter([
                {
                    path: '/',
                    element: (
                        <PrivateRoute>
                            <Layout key='layout'>
                                <Outlet />
                            </Layout>
                        </PrivateRoute>
                    ),
                    errorElement: <Navigate to={NOT_FOUND} />,
                    children: [
                        {
                            path: MAIN,
                            element: <App />,
                            children: [
                                {
                                    path: CATEGORY,
                                    element: <Tabbed />,
                                    children: [
                                        {
                                            path: SUBCATEGORY,
                                            element: <Subcategory />,
                                        },
                                    ],
                                },
                                {
                                    path: THE_JUICIEST,
                                    element: <Juciest />,
                                },
                            ],
                        },
                        {
                            path: `${CATEGORY}/${SUBCATEGORY}/${RECIPE_ID}`,
                            element: <Recipe />,
                        },
                    ],
                },
                {
                    path: VERIFICATION,
                    element: <Auth />,
                },
                {
                    path: REGISTRATION,
                    element: <Auth />,
                },
                {
                    path: LOGIN,
                    element: <Auth />,
                },
                {
                    path: NOT_FOUND,
                    element: (
                        <Layout key='layout'>
                            <Error />,
                        </Layout>
                    ),
                },
            ] as AppRoute[]),
        [],
    );

    return <RouterProvider router={router} />;
};

export default Router;

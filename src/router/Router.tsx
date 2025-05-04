import { useMemo } from 'react';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';

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
    const { data: routes, isLoading } = useGetCategoriesQuery();
    console.log('isLoading', isLoading);

    const transformedRoutes = useMemo(() => routes?.map(transformMenuToRoutes) || [], [routes]);

    // const toast = useToast();
    // useEffect(() => {
    //     toast({
    //         status: 'error',
    //         title: 'Ошибука!',
    //         description: 'Горім, плохоas sa dasda dasdsd  dsa adas as sa as sa as as assas a',
    //     });
    // }, []);

    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <Layout>
                    <Outlet />
                </Layout>
            ),
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
                {
                    path: 'not-found',
                    element: <Error />,
                },
            ],
        },
    ] as AppRoute[]);

    return <RouterProvider router={router} />;
};

export default Router;

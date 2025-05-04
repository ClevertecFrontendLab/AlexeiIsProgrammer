import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import App from '~/app/App';
import Recipe from '~/pages/Recipe';
import {
    AppRoute,
    transformMenuToRoutes,
    useGetCategoriesQuery,
    // useGetCategoryByIdQuery,
} from '~/query/services/categories';
// import {
//     useGetRecipeByIdQuery,
//     useGetRecipeByUserIdQuery,
//     useGetRecipesByCategoryQuery,
//     useGetRecipesQuery,
// } from '~/query/services/recipes';

const Router = () => {
    const { data: routes, isLoading } = useGetCategoriesQuery();

    // const { data: recipes } = useGetRecipesQuery({});
    // const { data: recipe } = useGetRecipeByIdQuery('67c756f1e51aaa64ce766aeb');
    // const { data: recipeByCategory } = useGetRecipesByCategoryQuery({
    //     id: '67e41cd40f68c23754bc1e06',
    // });
    // const { data: recipeByUser } = useGetRecipeByUserIdQuery('67e41cd40f68c23754bc1e06');

    // const { data: category } = useGetCategoryByIdQuery('67c47208f51967aa8390bef9');

    const transformedRoutes = useMemo(() => routes?.map(transformMenuToRoutes) || [], [routes]);

    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                ...transformedRoutes,
                {
                    path: ':category/:subCategory/:recipeId',
                    element: <Recipe />,
                },
            ],
        },
    ] as AppRoute[]);

    return isLoading ? <h1>Загрузка...</h1> : <RouterProvider router={router} />;
};

export default Router;

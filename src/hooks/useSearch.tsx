import { useLocation } from 'react-router';

import { useGetCategoriesQuery, useGetCategoryByIdQuery } from '~/query/services/categories';
import {
    GetRecipesParams,
    useGetRecipesByCategoryQuery,
    useGetRecipesQuery,
    useLazyGetRecipesQuery,
} from '~/query/services/recipes';
import { MAIN, THE_JUICIEST } from '~/router/constants/routes';
import { hasActiveFiltersSelector, userFilterSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentRoute from '~/utils/getCurrentRoute';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';
import transformAllergen from '~/utils/transformAllergen';

const useSearch = () => {
    const { activeAllergens, search, meats, sides, page } = useAppSelector(userFilterSelector);
    const hasActiveFilters = useAppSelector(hasActiveFiltersSelector);
    const { pathname } = useLocation();

    const [getRecipes, { isFetching: areAllRecipesLazyFetching }] = useLazyGetRecipesQuery();

    const { data: categories } = useGetCategoriesQuery();
    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);
    const currentRoute = getCurrentRoute(categories || [], currentCategory);

    const { data: category } = useGetCategoryByIdQuery(currentRoute?._id || '', {
        skip: !currentRoute?._id,
    });

    const subcategory = category?.subCategories?.find((sub) => sub.category === currentSubcategory);

    const isJuiciest = currentCategory === THE_JUICIEST || pathname === MAIN;

    // Request params

    const id = subcategory?._id || '';
    const limit = pathname === MAIN && !hasActiveFilters ? 4 : 8;
    const allergens = activeAllergens.map((m) => transformAllergen(m.value)).join(',');
    const searchString = search;
    const meat = meats.map((m) => m.value).join(',');
    const garnish = sides.map((m) => m.value).join(',');
    const subcategoriesIds = category?.subCategories?.map((s) => s._id).join(',');

    const sort = (param: string) =>
        currentCategory === THE_JUICIEST || (pathname === MAIN && !hasActiveFilters) ? param : '';

    const sortBy = sort('likes') as 'likes' | '',
        sortOrder = sort('desc') as 'desc' | '';

    // Request params

    const requestBody: GetRecipesParams = {
        page,
        limit,
        allergens,
        searchString,
        meat,
        garnish,
        subcategoriesIds,
        sortBy,
        sortOrder,
    };

    const {
        data: recipesByCategory,
        isError: isRecipesByCategoryError,
        isFetching: isRecipesByCategoryFetching,
    } = useGetRecipesByCategoryQuery(
        {
            id,
            page,
            limit,
            allergens,
            searchString,
        },
        { skip: !subcategory || isJuiciest },
    );

    const {
        data: allRecipes,
        isError: isAllRecipesError,
        isFetching: isAllRecipesFetching,
        isLoading: isAllRecipesLoading,
    } = useGetRecipesQuery(requestBody, { skip: !category && !isJuiciest });

    const getRecipesHandle = () => {
        getRecipes(requestBody);
    };

    const { data, isError, isLoading, isFetching } = !isJuiciest
        ? {
              data: recipesByCategory,
              isError: isRecipesByCategoryError,
              isFetching: isRecipesByCategoryFetching,
          }
        : {
              data: allRecipes,
              isError: isAllRecipesError,
              isLoading: isAllRecipesLoading || areAllRecipesLazyFetching,
              isFetching: isAllRecipesFetching,
          };

    return { data, isError, isFetching, isLoading, getRecipes: getRecipesHandle };
};

export default useSearch;

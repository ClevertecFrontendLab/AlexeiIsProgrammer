import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    SimpleGrid,
    useBreakpointValue,
    useMediaQuery,
    useToast,
} from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';

import { useGetCategoriesQuery, useGetCategoryByIdQuery } from '~/query/services/categories';
import { useGetRecipesByCategoryQuery, useGetRecipesQuery } from '~/query/services/recipes';
import {
    addItems,
    hasActiveFiltersSelector,
    setItems,
    setPage,
    userFilterSelector,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Recipe } from '~/types';
import getCategoriesPath from '~/utils/getCategoriesPath';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentRoute from '~/utils/getCurrentRoute';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';
import transformAllergen from '~/utils/transformAllergen';

import Item from '../Item';

const Subcategory = () => {
    const toast = useToast();
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const isSmallMobile = useBreakpointValue({ base: true, md: false });
    const [isLargeMobile] = useMediaQuery('(max-width: 1440px)');

    const dispatch = useAppDispatch();

    const { activeAllergens, search, meats, sides, page, items } =
        useAppSelector(userFilterSelector);
    const hasActiveFilters = useAppSelector(hasActiveFiltersSelector);

    const { data: categories } = useGetCategoriesQuery();
    const { pathname } = useLocation();
    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);
    const currentRoute = getCurrentRoute(categories || [], currentCategory);

    const { data: category } = useGetCategoryByIdQuery(currentRoute?._id || '', {
        skip: !currentRoute?._id,
    });

    const subcategory = category?.subCategories?.find((sub) => sub.category === currentSubcategory);

    const isJuiciest = currentCategory === 'the-juiciest' || pathname === '/';

    const {
        data: recipesByCategory,
        isError: isRecipesByCategoryError,
        isFetching: isRecipesByCategoryFetching,
    } = useGetRecipesByCategoryQuery(
        {
            id: subcategory?._id || '',
            page,
            limit: pathname === '/' && !hasActiveFilters ? 4 : 8,
            allergens: activeAllergens.map((m) => transformAllergen(m.value)).join(','),
            searchString: search,
        },
        { skip: !subcategory || isJuiciest },
    );

    const {
        data: allRecipes,
        isError: isAllRecipesError,
        isFetching: isAllRecipesFetching,
    } = useGetRecipesQuery(
        {
            page,
            limit: pathname === '/' && !hasActiveFilters ? 4 : 8,
            allergens: activeAllergens.map((m) => transformAllergen(m.value)).join(','),
            searchString: search,
            meat: meats.map((m) => m.value).join(','),
            garnish: sides.map((m) => m.value).join(','),
            subcategoriesIds: category?.subCategories?.map((s) => s._id).join(','),
            sortBy:
                currentCategory === 'the-juiciest' || (pathname === '/' && !hasActiveFilters)
                    ? 'likes'
                    : '',
            sortOrder:
                currentCategory === 'the-juiciest' || (pathname === '/' && !hasActiveFilters)
                    ? 'desc'
                    : '',
        },
        { skip: !category && !isJuiciest },
    );

    const [recipes, isError, isFetching] = !isJuiciest
        ? [recipesByCategory, isRecipesByCategoryError, isRecipesByCategoryFetching]
        : [allRecipes, isAllRecipesError, isAllRecipesFetching];

    const getItemPath = useCallback(
        (item: Recipe) => {
            console.log(
                `/${(isJuiciest ? '' : currentCategory) || getCategoriesPath(item.categoriesIds?.[0], categories)[0]}/${currentSubcategory || getCategoriesPath(item.categoriesIds?.[0], categories)[1]}/${item._id}`,
            );

            return `/${(isJuiciest ? '' : currentCategory) || getCategoriesPath(item.categoriesIds?.[0], categories)[0]}/${currentSubcategory || getCategoriesPath(item.categoriesIds?.[0], categories)[1]}/${item._id}`;
        },
        [isJuiciest, categories, currentCategory, currentSubcategory],
    );

    useEffect(() => {
        if (isError) {
            toast();
        }
    }, [toast, isError]);

    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, pathname]);

    useEffect(() => {
        if (!recipes?.data) return;

        if (recipes.meta.page === 1) {
            dispatch(setItems(recipes.data));
        } else {
            dispatch(addItems(recipes.data));
        }
    }, [recipes?.meta.page, recipes, dispatch]);

    return (
        <Flex direction='column' alignItems='center'>
            <SimpleGrid
                spacing='24px'
                columns={(isLargeMobile && !isMobile) || isSmallMobile ? 1 : 2}
            >
                {items &&
                    items.length > 0 &&
                    items.map((item, i) => (
                        <Item index={i} key={item._id} item={item} to={getItemPath(item)} />
                    ))}
            </SimpleGrid>
            {recipes?.meta.totalPages !== recipes?.meta.page &&
                recipes?.meta.totalPages !== recipes?.meta.total &&
                (pathname !== '/' || hasActiveFilters) && (
                    <Button
                        onClick={() => dispatch(setPage(page + 1))}
                        data-test-id='load-more-button'
                        mt='12px'
                        rightIcon={<ArrowForwardIcon />}
                        bg='lime.400'
                    >
                        {isFetching ? 'Загрузка' : 'Загрузить ещё'}
                    </Button>
                )}
        </Flex>
    );
};

export default Subcategory;

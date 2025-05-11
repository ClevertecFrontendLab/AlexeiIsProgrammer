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

import { LOAD_MORE_BUTTON } from '~/constants/test-id';
import useSearch from '~/hooks/useSearch';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { MAIN, THE_JUICIEST } from '~/router/constants/routes';
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
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';

import Item from '../Item';

const Subcategory = () => {
    const toast = useToast();
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const isSmallMobile = useBreakpointValue({ base: true, md: false });
    const [isLargeMobile] = useMediaQuery('(max-width: 1440px)');

    const dispatch = useAppDispatch();

    const { page, items } = useAppSelector(userFilterSelector);
    const hasActiveFilters = useAppSelector(hasActiveFiltersSelector);

    const { data: categories } = useGetCategoriesQuery();
    const { pathname } = useLocation();
    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);

    const isJuiciest = currentCategory === THE_JUICIEST || pathname === MAIN;

    const { data: recipes, isError, isFetching } = useSearch();

    const getItemPath = useCallback(
        (item: Recipe) =>
            `/${(isJuiciest ? '' : currentCategory) || getCategoriesPath(item.categoriesIds?.[0], categories)[0]}/${currentSubcategory || getCategoriesPath(item.categoriesIds?.[0], categories)[1]}/${item._id}`,
        [isJuiciest, categories, currentCategory, currentSubcategory],
    );

    const showLoadMoreButton =
        recipes?.meta.totalPages !== recipes?.meta.page &&
        recipes?.meta.totalPages !== recipes?.meta.total &&
        (pathname !== '/' || hasActiveFilters);

    useEffect(() => {
        if (isError) {
            toast({
                status: 'error',
                title: 'Ошибка сервера',
                description: 'Попробуйте поискать снова попозже',
            });
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
            {showLoadMoreButton && (
                <Button
                    onClick={() => dispatch(setPage(page + 1))}
                    data-test-id={LOAD_MORE_BUTTON}
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

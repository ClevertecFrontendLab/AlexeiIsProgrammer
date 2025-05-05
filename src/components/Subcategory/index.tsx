import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    SimpleGrid,
    useBreakpointValue,
    useMediaQuery,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { setPage, userFilterSelector } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';

import Item from '../Item';

const Subcategory = () => {
    const toast = useToast();
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const isSmallMobile = useBreakpointValue({ base: true, md: false });
    const [isLargeMobile] = useMediaQuery('(max-width: 1440px)');

    const dispatch = useAppDispatch();

    const { activeAllergens, search, meats, sides, page } = useAppSelector(userFilterSelector);

    const { data: categories } = useGetCategoriesQuery();
    const { pathname } = useLocation();
    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);

    const isJuiciest = currentCategory === 'the-juiciest' || pathname === '/';

    const category = useMemo(
        () => categories?.find((category) => category.category === currentCategory),
        [currentCategory, categories],
    );

    const { data: recipes, isError } = useGetRecipesQuery(
        {
            page: 1,
            limit: pathname === '/' ? 4 : 8 * page,
            allergens: activeAllergens.map((m) => m.value).join(','),
            searchString: search,
            meat: meats.map((m) => m.value).join(','),
            garnish: sides.map((m) => m.value).join(','),
            subcategoriesIds: category?.subCategories?.map((s) => s._id).join(','),
            sortBy: isJuiciest ? 'likes' : '',
            sortOrder: isJuiciest ? 'desc' : '',
        },
        { skip: !category && !isJuiciest },
    );

    useEffect(() => {
        if (isError) {
            toast();
        }
    }, [toast, isError]);

    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, pathname]);

    return (
        <Flex direction='column' alignItems='center'>
            {/* {(areRecipesLoading || areCategoriesLoading) && (
                <CustomSpinner data-test-id='app-loader' spinnerOverflow />
            )} */}
            <SimpleGrid
                spacing='24px'
                columns={(isLargeMobile && !isMobile) || isSmallMobile ? 1 : 2}
            >
                {recipes?.data &&
                    recipes?.data.length > 0 &&
                    recipes.data.map((item, i) => (
                        <Item
                            index={i}
                            key={item._id}
                            item={item}
                            currentCategory={isJuiciest ? '' : currentCategory}
                            currentSubcategory={currentSubcategory}
                        />
                    ))}
            </SimpleGrid>
            {recipes?.meta.totalPages !== recipes?.meta.page && pathname !== '/' && (
                <Button
                    onClick={() => dispatch(setPage(page + 1))}
                    data-test-id='load-more-button'
                    mt='12px'
                    rightIcon={<ArrowForwardIcon />}
                    bg='lime.400'
                >
                    Загрузить ещё
                </Button>
            )}
        </Flex>
    );
};

export default Subcategory;

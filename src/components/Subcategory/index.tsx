import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, SimpleGrid, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation } from 'react-router';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { userFilterSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';

import Item from '../Item';

const Subcategory = () => {
    const { data: categories } = useGetCategoriesQuery();

    const isMobile = useBreakpointValue({ base: true, lg: false });
    const isSmallMobile = useBreakpointValue({ base: true, md: false });
    const [isLargeMobile] = useMediaQuery('(max-width: 1440px)');

    const { pathname } = useLocation();

    const { activeAllergens, search, meats, sides } = useAppSelector(userFilterSelector);

    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);

    const category = useMemo(
        () => categories?.find((category) => category.category === currentCategory),
        [currentCategory, categories],
    );

    const { data: recipes } = useGetRecipesQuery(
        {
            page: 1,
            limit: 8,
            allergens: activeAllergens.map((m) => m.value).join(','),
            searchString: search,
            meat: meats.map((m) => m.value).join(','),
            garnish: sides.map((m) => m.value).join(','),
            subcategoriesIds: category?.subCategories?.map((s) => s._id).join(','),
        },
        { skip: !category },
    );

    return (
        <Flex direction='column' alignItems='center'>
            <SimpleGrid
                spacing='24px'
                columns={(isLargeMobile && !isMobile) || isSmallMobile ? 1 : 2}
            >
                {recipes?.data.map((item, i) => (
                    <Item
                        index={i}
                        key={item._id}
                        item={item}
                        currentCategory={currentCategory === 'the-juiciest' ? '' : currentCategory}
                        currentSubcategory={currentSubcategory}
                    />
                ))}
            </SimpleGrid>
            {recipes?.meta.totalPages !== recipes?.meta.page && (
                <Button mt='12px' rightIcon={<ArrowForwardIcon />} bg='lime.400'>
                    Загрузить ещё
                </Button>
            )}
        </Flex>
    );
};

export default Subcategory;

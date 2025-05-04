import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Text, useBreakpointValue, useToast } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useGetCategoriesQuery } from '~/query/services/categories';
import { useLazyGetRecipesQuery } from '~/query/services/recipes';
import { userFilterSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import getCurrentCategory from '~/utils/getCurrentCategory';

import Subcategory from '../Subcategory';

const Juciest = () => {
    const navigate = useNavigate();
    const { data: categories } = useGetCategoriesQuery();
    const { pathname } = useLocation();
    const toast = useToast();

    const currentCategory = getCurrentCategory(pathname);

    const category = useMemo(
        () => categories?.find((category) => category.category === currentCategory),
        [currentCategory, categories],
    );

    const { activeAllergens, search, meats, sides } = useAppSelector(userFilterSelector);

    const isJuiciest = pathname === '/the-juiciest';

    const isMobile = useBreakpointValue({ base: true, lg: false });

    const [getRecipes] = useLazyGetRecipesQuery();

    const toJuiciestHandle = () => {
        getRecipes({
            page: 1,
            limit: 8,
            allergens: activeAllergens.map((m) => m.value).join(','),
            searchString: search,
            meat: meats.map((m) => m.value).join(','),
            garnish: sides.map((m) => m.value).join(','),
            subcategoriesIds: category?.subCategories?.map((s) => s._id).join(','),
            sortBy: 'likes',
            sortOrder: 'desc',
        })
            .unwrap()
            .then(() => {
                navigate('/the-juiciest');
            })
            .catch(toast);
    };

    return (
        <Box mt='40px'>
            {!isJuiciest && (
                <Flex mb='24px' justifyContent='space-between' alignItems='flex-end'>
                    <Text
                        color='black'
                        lineHeight={isMobile ? '24px' : '48px'}
                        fontSize={isMobile ? '24px' : '48px'}
                        fontWeight='500'
                        textAlign='left'
                    >
                        Самое сочное
                    </Text>

                    <Button
                        onClick={toJuiciestHandle}
                        rightIcon={<ArrowForwardIcon />}
                        bg='lime.400'
                        data-test-id='juiciest-link'
                        display={!isMobile ? 'block' : 'none'}
                    >
                        Вся подборка
                    </Button>
                </Flex>
            )}

            <Subcategory />

            {!isJuiciest && (
                <Button
                    mt='20px'
                    onClick={toJuiciestHandle}
                    rightIcon={<ArrowForwardIcon />}
                    bg='lime.400'
                    data-test-id='juiciest-link-mobile'
                    display={isMobile ? 'block' : 'none'}
                >
                    Вся подборка
                </Button>
            )}
        </Box>
    );
};

export default Juciest;

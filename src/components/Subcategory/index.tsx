import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, SimpleGrid, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import { userFilterSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import { RecipeType } from '~/types';
import filterAll from '~/utils/filterAll';
import filterByAllergens from '~/utils/filterByAllergens';
import filterByAuthor from '~/utils/filterByAuthor';
import filterByCategory from '~/utils/filterByCategory';
import filterByMeat from '~/utils/filterByMeat';
import filterBySearch from '~/utils/filterBySearch';
import filterBySide from '~/utils/filterBySide';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';
import getRecipeBySubcategory from '~/utils/getRecipesBySubcategory';

import recipes from '../../db.json';
import Item from '../Item';

const Subcategory = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const isSmallMobile = useBreakpointValue({ base: true, md: false });
    const [isLargeMobile] = useMediaQuery('(max-width: 1440px)');

    const { pathname } = useLocation();

    const { activeAllergens, search, meats, sides, authors, categories } =
        useAppSelector(userFilterSelector);

    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);

    const items: RecipeType[] = filterAll(
        getRecipeBySubcategory,
        filterByAllergens,
        filterByMeat,
        filterBySide,
        filterByCategory,
        filterByAuthor,
        filterBySearch,
    )(
        currentSubcategory,
        activeAllergens,
        meats,
        sides,
        categories,
        authors,
        search,
    )(recipes);

    const juciest = (
        currentCategory === 'the-juiciest' || pathname === '/'
            ? structuredClone(items).sort((a, b) => b.likes - a.likes)
            : items
    ).slice(0, 8);

    return (
        <Flex direction='column' alignItems='center'>
            <SimpleGrid
                spacing='24px'
                columns={(isLargeMobile && !isMobile) || isSmallMobile ? 1 : 2}
            >
                {juciest.map((item, i) => (
                    <Item
                        index={i}
                        key={item.id}
                        item={item}
                        currentCategory={currentCategory === 'the-juiciest' ? '' : currentCategory}
                        currentSubcategory={currentSubcategory}
                    />
                ))}
            </SimpleGrid>
            {juciest.length === 8 && (
                <Button mt='12px' rightIcon={<ArrowForwardIcon />} bg='lime.400'>
                    Загрузить ещё
                </Button>
            )}
        </Flex>
    );
};

export default Subcategory;

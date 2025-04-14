import { Box, Heading } from '@chakra-ui/react';
import type React from 'react';

import RecipeGrid from '../components/RecipeGrid';
import { popularRecipes } from '../data';

const PopularPage: React.FC = () => (
    <Box maxW='1200px' mx='auto'>
        <Heading as='h1' size='lg' mb={6}>
            Самое сочное
        </Heading>

        <RecipeGrid title='Популярные рецепты' recipes={popularRecipes} columns={4} />
    </Box>
);

export default PopularPage;

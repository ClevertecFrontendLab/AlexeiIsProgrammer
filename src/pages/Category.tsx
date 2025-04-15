import { Box, Heading } from '@chakra-ui/react';
import type React from 'react';
import { useParams } from 'react-router';

import RecipeGrid from '../components/RecipeGrid';
import { categoryRecipes } from '../data';

type CategoryParams = {
    type: string;
};

const CategoryPage: React.FC = () => {
    const { type } = useParams<CategoryParams>();

    // Get category title based on type
    const getCategoryTitle = () => {
        switch (type) {
            case 'vegetarian':
                return 'Вегетарианская кухня';
            case 'italian':
                return 'Итальянская кухня';
            case 'french':
                return 'Французская кухня';
            case 'desserts':
                return 'Десерты';
            case 'meat':
                return 'Мясные блюда';
            case 'fish':
                return 'Рыбные блюда';
            default:
                return 'Рецепты';
        }
    };

    // Get recipes for this category
    const recipes = categoryRecipes[type as keyof typeof categoryRecipes] || [];

    return (
        <Box maxW='1200px' mx='auto'>
            <Heading as='h1' size='lg' mb={6}>
                {getCategoryTitle()}
            </Heading>

            <RecipeGrid title='Рецепты' recipes={recipes} columns={4} />
        </Box>
    );
};

export default CategoryPage;

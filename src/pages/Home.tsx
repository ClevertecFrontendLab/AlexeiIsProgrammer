import { Box, Heading } from '@chakra-ui/react';
import type React from 'react';

import CommentCard from '../components/CommentCard';
import RecipeGrid from '../components/RecipeGrid';
import RecipeListItem from '../components/RecipeListItem';
import { comments, newRecipes, popularRecipes } from '../data';

const HomePage: React.FC = () => (
    <Box maxW='1200px' mx='auto'>
        <Heading as='h1' size='lg' mb={6}>
            Приятного аппетита!
        </Heading>

        {/* New Recipes Section */}
        <RecipeGrid title='Новые рецепты' recipes={newRecipes} viewAllLink='/category/new' />

        {/* Most Popular Section */}
        <Box mb={8}>
            <Heading as='h2' size='md' mb={4}>
                Самое сочное
            </Heading>

            {popularRecipes.slice(0, 3).map((recipe) => (
                <RecipeListItem key={recipe.id} {...recipe} comments={recipe.comments} />
            ))}
        </Box>

        {/* Comments Section */}
        <Box mb={8}>
            <Heading as='h2' size='md' mb={4}>
                Комментарии блюд
            </Heading>

            <Box display='grid' gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                {comments.map((comment) => (
                    <CommentCard key={comment.id} {...comment} />
                ))}
            </Box>
        </Box>
    </Box>
);

export default HomePage;

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import type React from 'react';
import { Link } from 'react-router';

import type { Recipe } from '../../types';
import RecipeCard from '../RecipeCard';

interface RecipeGridProps {
    title: string;
    recipes: Recipe[];
    viewAllLink?: string;
    columns?: number;
    isCompact?: boolean;
}

const RecipeGrid: React.FC<RecipeGridProps> = ({
    title,
    recipes,
    viewAllLink,
    columns = 4,
    isCompact = false,
}) => (
    <Box mb={8}>
        <Flex justify='space-between' align='center' mb={4}>
            <Heading as='h2' size='md'>
                {title}
            </Heading>
            {viewAllLink && (
                <Link to={viewAllLink}>
                    <Button
                        rightIcon={<ChevronRightIcon />}
                        variant='ghost'
                        size='sm'
                        color='brand.500'
                        fontWeight='normal'
                    >
                        Смотреть все
                    </Button>
                </Link>
            )}
        </Flex>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: columns }} spacing={4}>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} {...recipe} isCompact={isCompact} />
            ))}
        </SimpleGrid>
    </Box>
);

export default RecipeGrid;

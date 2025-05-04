import { Button, Card, Image, Text, useToast } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { SOURCE_URL } from '~/constants';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useLazyGetRecipeByIdQuery } from '~/query/services/recipes';
import { Recipe } from '~/types';
import getCategoriesPath from '~/utils/getCategoriesPath';
import getCategoryBySubcategoryId from '~/utils/getCategoryBySubcategoryId';

type FactProps = {
    recipe: Recipe;
};

const Fact = ({ recipe }: FactProps) => {
    const { data: categories } = useGetCategoriesQuery();

    const navigate = useNavigate();
    const toast = useToast();

    const [getRecipe] = useLazyGetRecipeByIdQuery();

    const category = useMemo(
        () => getCategoryBySubcategoryId(recipe.categoriesIds?.[0], categories),
        [recipe, categories],
    );

    return (
        <Card align='center' w='100%' direction='row' gap='12px' py='14px' px='24px'>
            <Image w='24px' src={`${SOURCE_URL}${category?.icon}`} />
            <Text
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
                flex={1}
                lineHeight='140%'
                fontSize='20px'
                fontWeight='500'
            >
                {recipe.title}
            </Text>
            <Button
                colorScheme='green'
                variant='outline'
                onClick={() =>
                    getRecipe(recipe._id)
                        .unwrap()
                        .then(() =>
                            navigate(
                                `/${getCategoriesPath(recipe?.categoriesIds?.[0], categories)}/${recipe._id}`,
                            ),
                        )
                        .catch(toast)
                }
            >
                Готовить
            </Button>
        </Card>
    );
};

export default Fact;

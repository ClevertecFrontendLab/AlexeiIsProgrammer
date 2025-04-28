import {
    Box,
    Button,
    Flex,
    Heading,
    Image,
    SimpleGrid,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import type React from 'react';
import { useParams } from 'react-router';

import loveMark from '~/assets/love-mark.svg';
import loveSmile from '~/assets/love-smile.svg';
import Calculate from '~/components/Calculate';
import CustomBadge from '~/components/CustomBadge';
import Layout from '~/components/Layout';
import RecipeInfo from '~/components/RecipeInfo';
import SideIcon from '~/components/SideIcon';
import Slider from '~/components/Slider';
import Steps from '~/components/Steps';
import { RecipeType } from '~/types';
import getRecipeById from '~/utils/getRecipeById';

import alarm from '../assets/alarm.svg';

type RecipeParams = {
    id: string;
};

const Recipe: React.FC = () => {
    const { id } = useParams<RecipeParams>();
    const recipe: RecipeType | undefined = getRecipeById(id);
    console.log('recipe', recipe);

    const isMobile = useBreakpointValue({ base: true, md: false });

    if (!recipe) return null;
    console.log('recipe', recipe);

    return (
        <Layout>
            <Box maxW='1200px' mx='auto'>
                <SimpleGrid spacing='24px' columns={isMobile ? 1 : 2} mb='40px'>
                    <Image
                        src={recipe.image || 'https://via.placeholder.com/400x300'}
                        alt={recipe.title}
                        borderRadius='lg'
                        w='100%'
                        h={{ base: '200px', md: '400px' }}
                        objectFit='cover'
                    />

                    <Flex direction='column'>
                        <Flex justifyContent='space-between' gap='10px'>
                            <Flex>
                                {recipe.category.map((category) => (
                                    <CustomBadge color='lime.50' category={category} />
                                ))}
                            </Flex>
                            <Flex gap='8px'>
                                <SideIcon icon={loveMark} text={recipe.bookmarks.toString()} />
                                <SideIcon icon={loveSmile} text={recipe.likes.toString()} />
                            </Flex>
                        </Flex>

                        <Heading as='h1' size='xl' mb={3}>
                            {recipe.title}
                        </Heading>

                        <Text fontSize='md' color='gray.700' mb={6}>
                            {recipe.description}
                        </Text>

                        <Flex flexWrap='wrap' mt='auto' justifyContent='space-between' gap='10px'>
                            <CustomBadge color='blackAlpha.100' icon={alarm} text={recipe.time} />

                            <Flex gap='8px' flexWrap='wrap'>
                                <Button
                                    leftIcon={<Image src={loveSmile} />}
                                    variant='outline'
                                    colorScheme='dark'
                                >
                                    Оценить рецепт
                                </Button>
                                <Button leftIcon={<Image src={loveMark} />} bg='lime.400'>
                                    Сохранить в закладки
                                </Button>
                            </Flex>
                        </Flex>
                    </Flex>
                </SimpleGrid>

                <Box maxW='670px' mx='auto'>
                    <Box mb='40px'>
                        <Text mb='20px'>* Калорийность на одну порцию</Text>
                        <SimpleGrid columns={isMobile ? 1 : 4} gap='24px' mb='40px'>
                            <RecipeInfo
                                label='калорийность'
                                value={recipe.nutritionValue.calories}
                                measure='ккал'
                            />
                            <RecipeInfo
                                label='белки'
                                value={recipe.nutritionValue.proteins}
                                measure='грамм'
                            />
                            <RecipeInfo
                                label='жиры'
                                value={recipe.nutritionValue.fats}
                                measure='грамм'
                            />
                            <RecipeInfo
                                label='углеводы'
                                value={recipe.nutritionValue.carbohydrates}
                                measure='грамм'
                            />
                        </SimpleGrid>
                    </Box>

                    <Calculate portions={recipe.portions} ingredients={recipe.ingredients} />

                    <Steps steps={recipe.steps} />
                </Box>

                <Slider title='Новые рецепты' />
            </Box>
        </Layout>
    );
};

export default Recipe;

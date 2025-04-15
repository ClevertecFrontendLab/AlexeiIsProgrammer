import { CheckIcon, ChevronLeftIcon, StarIcon, TimeIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    Image,
    List,
    ListIcon,
    ListItem,
    Tag,
    Text,
    useBreakpointValue,
    VStack,
} from '@chakra-ui/react';
import type React from 'react';
import { Link, useParams } from 'react-router';

import { recipes } from '../data';

type RecipeParams = {
    id: string;
};

const RecipePage: React.FC = () => {
    const { id } = useParams<RecipeParams>();
    const recipe = recipes.find((r) => r.id === id) || recipes[0];

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box maxW='1200px' mx='auto'>
            <Link to='/'>
                <Button
                    variant='ghost'
                    leftIcon={<ChevronLeftIcon />}
                    size='sm'
                    mb={4}
                    color='gray.600'
                >
                    Назад к рецептам
                </Button>
            </Link>

            <Grid templateColumns={{ base: '1fr', md: '2fr 1fr' }} gap={6}>
                <GridItem>
                    <Image
                        src={recipe.image || 'https://via.placeholder.com/400x300'}
                        alt={recipe.title}
                        borderRadius='lg'
                        w='100%'
                        h={{ base: '200px', md: '400px' }}
                        objectFit='cover'
                        mb={4}
                    />

                    <Heading as='h1' size='xl' mb={3}>
                        {recipe.title}
                    </Heading>

                    <Text fontSize='md' color='gray.700' mb={6}>
                        {recipe.description}
                    </Text>

                    <Flex
                        wrap='wrap'
                        gap={4}
                        mb={6}
                        p={4}
                        bg='gray.50'
                        borderRadius='md'
                        justify='space-between'
                    >
                        <HStack>
                            <TimeIcon color='gray.500' />
                            <VStack spacing={0} align='start'>
                                <Text fontSize='sm' fontWeight='bold'>
                                    Время
                                </Text>
                                <Text fontSize='sm'>{recipe.time}</Text>
                            </VStack>
                        </HStack>

                        <HStack>
                            <Icon as={StarIcon} color='gray.500' />
                            <VStack spacing={0} align='start'>
                                <Text fontSize='sm' fontWeight='bold'>
                                    Порции
                                </Text>
                                <Text fontSize='sm'>{recipe.servings}</Text>
                            </VStack>
                        </HStack>

                        <HStack>
                            <Icon as={StarIcon} color='gray.500' />
                            <VStack spacing={0} align='start'>
                                <Text fontSize='sm' fontWeight='bold'>
                                    Сложность
                                </Text>
                                <Text fontSize='sm'>{recipe.difficulty}</Text>
                            </VStack>
                        </HStack>

                        <HStack>
                            <StarIcon color='brand.300' />
                            <VStack spacing={0} align='start'>
                                <Text fontSize='sm' fontWeight='bold'>
                                    Рейтинг
                                </Text>
                                <Text fontSize='sm'>{recipe.rating}</Text>
                            </VStack>
                        </HStack>
                    </Flex>

                    <Flex gap={2} mb={6}>
                        {recipe.tags &&
                            recipe.tags.map((tag) => (
                                <Tag key={tag} colorScheme='green' size='md'>
                                    {tag}
                                </Tag>
                            ))}
                    </Flex>

                    <Heading as='h2' size='md' mb={4}>
                        Ингредиенты
                    </Heading>
                    <List spacing={2} mb={8}>
                        {recipe.ingredients &&
                            recipe.ingredients.map((ingredient, index) => (
                                <ListItem key={index} display='flex' alignItems='center'>
                                    <ListIcon as={CheckIcon} color='green.500' />
                                    <Text>{ingredient}</Text>
                                </ListItem>
                            ))}
                    </List>

                    <Heading as='h2' size='md' mb={4}>
                        Приготовление
                    </Heading>
                    <List spacing={4} mb={8}>
                        {recipe.steps &&
                            recipe.steps.map((step, index) => (
                                <ListItem key={index} display='flex'>
                                    <Text
                                        fontWeight='bold'
                                        fontSize='lg'
                                        color='green.500'
                                        mr={3}
                                        lineHeight='1.5'
                                    >
                                        {index + 1}.
                                    </Text>
                                    <Text>{step}</Text>
                                </ListItem>
                            ))}
                    </List>
                </GridItem>

                <GridItem display={{ base: 'none', md: 'block' }}>
                    <Box position='sticky' top='80px'>
                        <VStack spacing={4} align='stretch'>
                            <Box p={4} borderWidth='1px' borderRadius='md'>
                                <Heading as='h3' size='sm' mb={4}>
                                    Автор рецепта
                                </Heading>
                                <Flex align='center'>
                                    <Avatar
                                        name={recipe.author}
                                        src={recipe.authorAvatar}
                                        size='md'
                                        mr={3}
                                    />
                                    <Text fontWeight='medium'>{recipe.author}</Text>
                                </Flex>
                            </Box>

                            <Box p={4} borderWidth='1px' borderRadius='md'>
                                <Heading as='h3' size='sm' mb={4}>
                                    Действия
                                </Heading>
                                <VStack spacing={2} align='stretch'>
                                    <Button
                                        leftIcon={<Icon as={StarIcon} />}
                                        colorScheme='red'
                                        variant='outline'
                                    >
                                        В избранное
                                    </Button>
                                    <Button
                                        leftIcon={<Icon as={StarIcon} />}
                                        colorScheme='blue'
                                        variant='outline'
                                    >
                                        Сохранить
                                    </Button>
                                    <Button
                                        leftIcon={<Icon as={StarIcon} />}
                                        colorScheme='green'
                                        variant='outline'
                                    >
                                        Поделиться
                                    </Button>
                                    <Button
                                        leftIcon={<Icon as={StarIcon} />}
                                        colorScheme='gray'
                                        variant='outline'
                                    >
                                        Распечатать
                                    </Button>
                                </VStack>
                            </Box>
                        </VStack>
                    </Box>
                </GridItem>
            </Grid>

            {isMobile && (
                <Flex mt={8} mb={4} gap={2} justify='space-between'>
                    <Button
                        leftIcon={<Icon as={StarIcon} />}
                        colorScheme='red'
                        variant='outline'
                        flex='1'
                    >
                        В избранное
                    </Button>
                    <Button
                        leftIcon={<Icon as={StarIcon} />}
                        colorScheme='blue'
                        variant='outline'
                        flex='1'
                    >
                        Сохранить
                    </Button>
                    <Button
                        leftIcon={<Icon as={StarIcon} />}
                        colorScheme='green'
                        variant='outline'
                        flex='1'
                    >
                        Поделиться
                    </Button>
                </Flex>
            )}
        </Box>
    );
};

export default RecipePage;

import { TimeIcon } from '@chakra-ui/icons';
import { Box, Button, Center, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import type React from 'react';
import { Link } from 'react-router';

const FavoritesPage: React.FC = () => {
    // For demo purposes, showing empty state
    const hasFavorites = false;

    return (
        <Box maxW='1200px' mx='auto'>
            <Heading as='h1' size='lg' mb={6}>
                Избранное
            </Heading>

            {hasFavorites ? (
                <Box>
                    {/* Favorites would be displayed here */}
                    <Text>Ваши избранные рецепты</Text>
                </Box>
            ) : (
                <Center py={10}>
                    <VStack spacing={4}>
                        <Icon as={TimeIcon} boxSize='50px' color='gray.300' />
                        <Heading as='h3' size='md' textAlign='center'>
                            У вас пока нет избранных рецептов
                        </Heading>
                        <Text color='gray.500' textAlign='center'>
                            Добавляйте понравившиеся рецепты в избранное, чтобы быстро находить их
                            позже
                        </Text>
                        <Link to='/'>
                            <Button colorScheme='green' mt={2}>
                                Найти рецепты
                            </Button>
                        </Link>
                    </VStack>
                </Center>
            )}
        </Box>
    );
};

export default FavoritesPage;

import { ChatIcon, StarIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Image, Text } from '@chakra-ui/react';
import type React from 'react';
import { Link } from 'react-router';

interface RecipeListItemProps {
    id: string;
    title: string;
    image: string;
    time: string;
    rating: number;
    description: string;
    comments?: number;
}

const RecipeListItem: React.FC<RecipeListItemProps> = ({
    id,
    title,
    image,
    time,
    rating,
    description,
    comments = 0,
}) => (
    <Box
        borderWidth='1px'
        borderRadius='lg'
        overflow='hidden'
        bg='white'
        transition='all 0.2s'
        _hover={{ shadow: 'md' }}
        mb={4}
    >
        <Flex direction={{ base: 'column', md: 'row' }} p={3} gap={4}>
            <Link to={`/recipe/${id}`}>
                <Box
                    minW={{ base: '100%', md: '200px' }}
                    h={{ base: '180px', md: '140px' }}
                    borderRadius='md'
                    overflow='hidden'
                >
                    <Image
                        src={image || 'https://via.placeholder.com/400x300'}
                        alt={title}
                        objectFit='cover'
                        w='100%'
                        h='100%'
                    />
                </Box>
            </Link>

            <Flex direction='column' flex='1'>
                <Link to={`/recipe/${id}`}>
                    <Text fontWeight='semibold' fontSize='md' mb={2}>
                        {title}
                    </Text>
                </Link>

                <Text fontSize='sm' color='gray.600' mb={3} noOfLines={{ base: 2, md: 3 }}>
                    {description}
                </Text>

                <Flex mt='auto' justify='space-between' align='center'>
                    <HStack spacing={4}>
                        <HStack>
                            <StarIcon color='brand.300' boxSize='14px' />
                            <Text fontSize='xs' fontWeight='bold'>
                                {rating}
                            </Text>
                        </HStack>

                        <HStack>
                            <TimeIcon color='gray.500' boxSize='14px' />
                            <Text fontSize='xs' color='gray.500'>
                                {time}
                            </Text>
                        </HStack>

                        {comments > 0 && (
                            <HStack>
                                <ChatIcon color='gray.500' boxSize='14px' />
                                <Text fontSize='xs' color='gray.500'>
                                    {comments}
                                </Text>
                            </HStack>
                        )}
                    </HStack>

                    <Link to={`/recipe/${id}`}>
                        <Button
                            size='sm'
                            colorScheme='black'
                            bg='black'
                            color='white'
                            _hover={{ bg: 'gray.800' }}
                        >
                            Смотреть
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </Flex>
    </Box>
);

export default RecipeListItem;

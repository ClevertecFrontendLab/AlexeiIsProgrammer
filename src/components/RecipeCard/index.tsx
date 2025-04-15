import { StarIcon, TimeIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, HStack, Icon, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import type React from 'react';
import { Link } from 'react-router';

interface RecipeCardProps {
    id: string;
    title: string;
    image: string;
    time: string;
    rating: number;
    description?: string;
    isFavorite?: boolean;
    isCompact?: boolean;
}

const RecipeCard: React.FC<RecipeCardProps> = ({
    id,
    title,
    image,
    time,
    rating,
    description,
    isFavorite = false,
    isCompact = false,
}) => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const cardSize = isCompact || isMobile ? 'compact' : 'full';

    return (
        <Box
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            bg='white'
            transition='all 0.2s'
            _hover={{ shadow: 'md' }}
            h={cardSize === 'compact' ? 'auto' : '100%'}
            display='flex'
            flexDirection='column'
        >
            <Link to={`/recipe/${id}`}>
                <Image
                    src={image || 'https://via.placeholder.com/400x300'}
                    alt={title}
                    objectFit='cover'
                    w='100%'
                    h={cardSize === 'compact' ? '120px' : '180px'}
                />
            </Link>

            <Flex direction='column' p={3} flex='1'>
                <Flex justify='space-between' align='center' mb={2}>
                    <HStack>
                        <TimeIcon color='gray.500' boxSize='14px' />
                        <Text fontSize='xs' color='gray.500'>
                            {time}
                        </Text>
                    </HStack>
                    <HStack>
                        <StarIcon color='brand.300' boxSize='14px' />
                        <Text fontSize='xs' fontWeight='bold'>
                            {rating}
                        </Text>
                    </HStack>
                </Flex>

                <Link to={`/recipe/${id}`}>
                    <Text
                        fontWeight='semibold'
                        fontSize={cardSize === 'compact' ? 'sm' : 'md'}
                        mb={2}
                        noOfLines={2}
                    >
                        {title}
                    </Text>
                </Link>

                {description && cardSize === 'full' && (
                    <Text fontSize='sm' color='gray.600' mb={3} noOfLines={2}>
                        {description}
                    </Text>
                )}

                <Flex mt='auto' justify='space-between' align='center'>
                    <Button
                        size='sm'
                        variant='ghost'
                        leftIcon={<Icon as={isFavorite ? StarIcon : TimeIcon} />}
                        color={isFavorite ? 'red.500' : 'gray.500'}
                        _hover={{ color: 'red.500' }}
                    >
                        {isFavorite ? 'В избранном' : 'В избранное'}
                    </Button>

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
        </Box>
    );
};

export default RecipeCard;

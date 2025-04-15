import { StarIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Flex, HStack, Text } from '@chakra-ui/react';
import type React from 'react';

interface CommentCardProps {
    author: string;
    authorInitials: string;
    time: string;
    text: string;
    rating: number;
}

const CommentCard: React.FC<CommentCardProps> = ({
    author,
    authorInitials,
    time,
    text,
    rating,
}) => (
    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' bg='white' p={3}>
        <Flex align='start' gap={2} mb={2}>
            <Avatar name={author} bg='brand.50' color='brand.700' size='sm'>
                {authorInitials}
            </Avatar>
            <Box>
                <Text fontWeight='medium' fontSize='sm'>
                    {author}
                </Text>
                <Text fontSize='xs' color='gray.500'>
                    {time}
                </Text>
            </Box>
        </Flex>

        <Text fontSize='sm' color='gray.700' mb={3}>
            {text}
        </Text>

        <Flex justify='space-between' align='center'>
            <HStack spacing={1}>
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        color={i < rating ? 'brand.300' : 'gray.200'}
                        boxSize='14px'
                    />
                ))}
            </HStack>

            <Button size='xs' variant='ghost' color='gray.500'>
                Ответить
            </Button>
        </Flex>
    </Box>
);

export default CommentCard;

import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Flex,
    SimpleGrid,
    Text,
    useBreakpointValue,
    useMediaQuery,
} from '@chakra-ui/react';

import BlogCard from './BlogCard';

const Blogs = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <Box mt='40px' p='24px' bg='lime.300' borderRadius='16px'>
            <Flex mb='24px' justifyContent='space-between' alignItems='flex-end'>
                <Text
                    color='black'
                    lineHeight={isMobile ? '24px' : '48px'}
                    fontSize={isMobile ? '24px' : '48px'}
                    fontWeight='500'
                    textAlign='left'
                >
                    Кулинарные блоги
                </Text>

                {!isMobile && (
                    <Button rightIcon={<ArrowForwardIcon />} bg='lime.300'>
                        Все авторы
                    </Button>
                )}
            </Flex>

            <Flex alignItems='center'>
                <SimpleGrid spacing='16px' columns={isSmallMobile ? 1 : 3}>
                    <BlogCard
                        avatar={{
                            name: 'Елена Высоцкая',
                            image: 'https://bit.ly/sage-adebayo',
                            tag: '@elenapovar',
                        }}
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    />
                    <BlogCard
                        avatar={{
                            name: 'Alex Cook',
                            image: 'https://bit.ly/sage-adebayo',
                            tag: '@funtasticooking',
                        }}
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    />
                    <BlogCard
                        avatar={{
                            name: 'Елена Высоцкая',
                            image: 'https://bit.ly/sage-adebayo',
                            tag: '@bake_and_pie',
                        }}
                        description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    />
                </SimpleGrid>
            </Flex>

            {isMobile && (
                <Button mx='auto' rightIcon={<ArrowForwardIcon />} bg='lime.300'>
                    Все авторы
                </Button>
            )}
        </Box>
    );
};

export default Blogs;

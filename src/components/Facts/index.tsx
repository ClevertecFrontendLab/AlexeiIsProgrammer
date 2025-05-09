import {
    Box,
    Flex,
    SimpleGrid,
    Text,
    useBreakpointValue,
    useMediaQuery,
    useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';

import { useGetCategoriesQuery, useGetCategoryByIdQuery } from '~/query/services/categories';
import { useGetRecipesByCategoryQuery } from '~/query/services/recipes';
import getRandomSubcategory from '~/utils/getRandomSubcategory';

import SlideItem from '../SlideItem';
import Fact from './Fact';

const Facts = () => {
    const toast = useToast();
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');
    const { data: categories } = useGetCategoriesQuery();

    const subcategory = useMemo(() => getRandomSubcategory(categories || []), [categories]);

    const { data: category } = useGetCategoryByIdQuery(subcategory?.rootCategoryId || '', {
        skip: !subcategory?.rootCategoryId,
    });

    const { data: facts, isError } = useGetRecipesByCategoryQuery(
        {
            limit: 5,
            id: subcategory?._id || '',
        },
        { skip: !subcategory?._id },
    );

    useEffect(() => {
        if (isError) {
            toast();
        }
    }, [isError, toast]);

    return (
        <Box
            pt='24px'
            borderTop='1px solid'
            borderColor='blackAlpha.200'
            mt='40px'
            borderRadius='16px'
        >
            <Flex
                direction={isSmallMobile ? 'column' : 'row'}
                mb='24px'
                justifyContent='space-between'
                alignItems='flex-start'
            >
                <Text
                    color='black'
                    lineHeight={isMobile ? '24px' : '48px'}
                    fontSize={isMobile ? '24px' : '48px'}
                    fontWeight='500'
                    textAlign='left'
                >
                    {category?.title}
                </Text>

                <Text w={isSmallMobile ? 'auto' : '32%'} color='blackAlpha.700' fontWeight='500'>
                    {category?.description}
                </Text>
            </Flex>

            <Flex alignItems='center' w='100%'>
                <SimpleGrid
                    alignItems='stretch'
                    w='100%'
                    spacing='16px'
                    columns={isSmallMobile ? 1 : 3}
                >
                    <SlideItem slide={facts?.data[0]} isFact />
                    <SlideItem slide={facts?.data[1]} isFact />
                    {facts?.data && facts?.data.length > 2 && (
                        <Flex direction='column' gap='12px' alignItems='flex-start'>
                            {facts?.data[2] && <Fact recipe={facts.data[2]} />}
                            {facts?.data[3] && <Fact recipe={facts.data[3]} />}
                            {facts?.data[4] && <Fact recipe={facts.data[4]} />}
                        </Flex>
                    )}
                </SimpleGrid>
            </Flex>
        </Box>
    );
};

export default Facts;

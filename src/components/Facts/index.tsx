import { Box, Flex, SimpleGrid, Text, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';

import kastrulya from '~/assets/sidebar/kastrulya.svg';
import pan from '~/assets/sidebar/pan.svg';

import SlideItem from '../SlideItem';
import Fact from './Fact';

const Facts = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');

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
                    Веганская кухня
                </Text>

                <Text w={isSmallMobile ? 'auto' : '32%'} color='blackAlpha.700' fontWeight='500'>
                    Интересны не только убеждённым вегетарианцам, но и тем, кто хочет попробовать
                    вегетарианскую диету и готовить вкусные вегетарианские блюда.
                </Text>
            </Flex>

            <Flex alignItems='center' w='100%'>
                <SimpleGrid
                    alignItems='stretch'
                    w='100%'
                    spacing='16px'
                    columns={isSmallMobile ? 1 : 3}
                >
                    <SlideItem isFact />
                    <SlideItem isFact />
                    <Flex direction='column' gap='12px' alignItems='flex-start'>
                        <Fact icon={pan} text='Стейк для вегетарианцев' />
                        <Fact icon={pan} text='Котлеты из гречки и фасоли' />
                        <Fact icon={kastrulya} text='Сырный суп с лапшой и брокколи' />
                    </Flex>
                </SimpleGrid>
            </Flex>
        </Box>
    );
};

export default Facts;

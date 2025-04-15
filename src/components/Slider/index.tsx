import { Box, Flex, IconButton, Image, Text, useBreakpointValue } from '@chakra-ui/react';

import arrowLeft from '~/assets/arrow-left.svg';
import arrowRight from '~/assets/arrow-right.svg';

import SlideItem, { Slide } from '../SlideItem';
import styles from './Slider.module.scss';

type SliderProps = {
    title?: string;
    slides?: Slide[];
};

const Slider = ({ title }: SliderProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    return (
        <Box>
            {title && (
                <Text
                    color='black'
                    lineHeight={isMobile ? '24px' : '48px'}
                    fontSize={isMobile ? '24px' : '48px'}
                    fontWeight='500'
                    textAlign='left'
                    mb='16px'
                >
                    {title}
                </Text>
            )}

            <Box position='relative'>
                <IconButton
                    aria-label='arrow-left'
                    icon={<Image src={arrowLeft} />}
                    className={`${styles.arrow} ${styles['arrow-left']}`}
                />
                <Flex gap='24px' overflowX='auto'>
                    <SlideItem />
                    <SlideItem />
                    <SlideItem />
                    <SlideItem />
                </Flex>
                <IconButton
                    aria-label='arrow-right'
                    icon={<Image src={arrowRight} />}
                    className={`${styles.arrow} ${styles['arrow-right']}`}
                />
            </Box>
        </Box>
    );
};

export default Slider;

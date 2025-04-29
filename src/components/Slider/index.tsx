import { Box, IconButton, Image, Text, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types';

import arrowLeft from '~/assets/arrow-left.svg';
import arrowRight from '~/assets/arrow-right.svg';
import slides from '~/db.json';

import SlideItem from '../SlideItem';
import styles from './Slider.module.scss';

type SliderProps = {
    title?: string;
};

const Slider = ({ title }: SliderProps) => {
    const navigate = useNavigate();

    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');
    const [isMedium] = useMediaQuery('(max-width: 1200px)');
    const [isLarge] = useMediaQuery('(max-width: 1440px)');

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const sortedSlides = useMemo(
        () =>
            slides
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10),
        [],
    );

    return (
        <Box mt='24px'>
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
                <Swiper
                    data-test-id='carousel'
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={
                        isSmallMobile ? 1.2 : isMobile ? 3.2 : isMedium ? 2 : isLarge ? 3 : 4
                    }
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    loop
                    onBeforeInit={(swiper: SwiperClass) => {
                        const navigation = swiper.params.navigation as NavigationOptions;

                        navigation.prevEl = prevRef.current;
                        navigation.nextEl = nextRef.current;
                    }}
                >
                    {sortedSlides.map((slide, i) => (
                        <SwiperSlide
                            data-test-id={`carousel-card-${i}`}
                            onClick={() =>
                                navigate(
                                    `/${slide.category[0]}/${slide.subcategory[0]}/${slide.id}`,
                                )
                            }
                            key={slide.id}
                        >
                            <SlideItem slide={slide} />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <IconButton
                    data-test-id='carousel-back'
                    ref={prevRef}
                    aria-label='arrow-left'
                    icon={<Image src={arrowLeft} />}
                    className={`${styles.arrow} ${styles['arrow-left']}`}
                />
                <IconButton
                    data-test-id='carousel-forward'
                    ref={nextRef}
                    aria-label='arrow-right'
                    icon={<Image src={arrowRight} />}
                    className={`${styles.arrow} ${styles['arrow-right']}`}
                />
            </Box>
        </Box>
    );
};

export default Slider;

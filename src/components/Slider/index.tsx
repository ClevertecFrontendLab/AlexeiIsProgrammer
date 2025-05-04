import { Box, IconButton, Image, Text, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { NavigationOptions } from 'swiper/types';

import arrowLeft from '~/assets/arrow-left.svg';
import arrowRight from '~/assets/arrow-right.svg';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipesQuery, useLazyGetRecipeByIdQuery } from '~/query/services/recipes';
import getCategoriesPath from '~/utils/getCategoriesPath';

import SlideItem from '../SlideItem';
import styles from './Slider.module.scss';

type SliderProps = {
    title?: string;
};

const Slider = ({ title }: SliderProps) => {
    const navigate = useNavigate();

    const { data: categories } = useGetCategoriesQuery();

    const { data: slides } = useGetRecipesQuery({
        sortBy: 'createdAt',
        sortOrder: 'desc',
        limit: 10,
    });
    const [getRecipe] = useLazyGetRecipeByIdQuery();

    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');
    const [isMedium] = useMediaQuery('(max-width: 1200px)');
    const [isLarge] = useMediaQuery('(max-width: 1440px)');

    const prevRef = useRef(null);
    const nextRef = useRef(null);

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
                    {slides?.data.map((slide, i) => (
                        <SwiperSlide
                            data-test-id={`carousel-card-${i}`}
                            onClick={() =>
                                getRecipe(slide._id).then(() =>
                                    navigate(
                                        `/${getCategoriesPath(slide.categoriesIds?.[0], categories)}/${slide._id}`,
                                    ),
                                )
                            }
                            key={slide._id}
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

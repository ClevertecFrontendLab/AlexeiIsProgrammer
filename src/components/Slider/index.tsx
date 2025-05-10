import {
    Box,
    IconButton,
    Image,
    Text,
    useBreakpointValue,
    useMediaQuery,
    useToast,
} from '@chakra-ui/react';
import { useCallback, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import arrowLeft from '~/assets/arrow-left.svg';
import arrowRight from '~/assets/arrow-right.svg';
import { CAROUSEL, CAROUSEL_BACK, CAROUSEL_CARD, CAROUSEL_FORWARD } from '~/constants/test-id';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipesQuery, useLazyGetRecipeByIdQuery } from '~/query/services/recipes';
import { Recipe } from '~/types';
import getCategoriesPath from '~/utils/getCategoriesPath';

import SlideItem from '../SlideItem';
import styles from './Slider.module.scss';

type SliderProps = {
    title?: string;
};

const Slider = ({ title }: SliderProps) => {
    const navigate = useNavigate();

    const { data: categories } = useGetCategoriesQuery();

    const { data } = useGetRecipesQuery({
        sortBy: 'createdAt',
        sortOrder: 'desc',
        limit: 10,
    });
    const toast = useToast();
    const [getRecipe] = useLazyGetRecipeByIdQuery();

    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');
    const [isMedium] = useMediaQuery('(max-width: 1200px)');
    const [isLarge] = useMediaQuery('(max-width: 1440px)');

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    // Test handling sorting
    const slides = useMemo(
        () =>
            [...(data?.data || [])]
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                .slice(0, 10),
        [data],
    );

    const redirectRecipeHandle = useCallback(
        (slide: Recipe) =>
            getRecipe(slide._id)
                .unwrap()
                .then(() =>
                    navigate(
                        `/${getCategoriesPath(slide.categoriesIds?.[0], categories).join('/')}/${slide._id}`,
                    ),
                )
                .catch(toast),
        [categories, getRecipe, navigate, toast],
    );

    const slidesPerView = useMemo(
        () =>
            (() => {
                switch (true) {
                    case isSmallMobile:
                        return 1.2;
                    case Boolean(isMobile):
                        return 3.2;
                    case isMedium:
                        return 2.2;
                    case isLarge:
                        return 3.2;
                    default:
                        return 4.2;
                }
            })(),
        [isSmallMobile, isMobile, isMedium, isLarge],
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
                {slides && (
                    <Swiper
                        data-test-id={CAROUSEL}
                        modules={[Navigation]}
                        spaceBetween={24}
                        slidesPerView={slidesPerView}
                        observer={true}
                        observeParents={true}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        speed={0}
                        loop
                        onInit={(swiper: SwiperClass) => {
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                    >
                        {slides.map((slide, i) => (
                            <SwiperSlide
                                data-test-id={`${CAROUSEL_CARD}-${i}`}
                                onClick={() => redirectRecipeHandle(slide)}
                                key={slide._id}
                            >
                                <SlideItem slide={slide} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                <IconButton
                    data-test-id={CAROUSEL_BACK}
                    ref={prevRef}
                    aria-label='arrow-left'
                    icon={<Image src={arrowLeft} />}
                    className={`${styles.arrow} ${styles['arrow-left']}`}
                />
                <IconButton
                    data-test-id={CAROUSEL_FORWARD}
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

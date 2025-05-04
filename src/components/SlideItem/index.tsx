import {
    Card,
    CardBody,
    CardFooter,
    Heading,
    Image,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import loveMark from '~/assets/love-mark.svg';
import { Recipe } from '~/types';

import CustomBadge from '../CustomBadge';
import SideIcon from '../SideIcon';
import styles from './SlideItem.module.scss';

export type SlideProps = {
    slide?: Recipe;
    isFact?: boolean;
};

const SlideItem = ({ isFact, slide }: SlideProps) => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Card
            _hover={{ shadow: 'md' }}
            borderRadius='8px'
            overflow='hidden'
            position='relative'
            maxW='md'
        >
            {slide?.image && !isFact && (
                <Image
                    h={isMobile ? '128px' : '230px'}
                    objectFit='cover'
                    src={slide.image}
                    alt='Chakra UI'
                />
            )}
            <CardBody p={isMobile ? '8px' : '12px'}>
                <Heading
                    title={slide?.title}
                    overflow='hidden'
                    whiteSpace='nowrap'
                    textOverflow='ellipsis'
                    fontSize='20px'
                    lineHeight='28px'
                    fontWeight='500'
                >
                    {slide?.title}
                </Heading>
                {(!isMobile || isFact) && (
                    <Text
                        title={slide?.description}
                        className={styles.description}
                        fontSize='14px'
                        lineHeight='20px'
                    >
                        {slide?.description}
                    </Text>
                )}
            </CardBody>
            <CardFooter p={isMobile ? '8px' : '12px'} justify='space-between' flexWrap='wrap'>
                <CustomBadge
                    color='lime.150'
                    className={styles.badge}
                    category={slide?.category[0]}
                />

                <SideIcon text='1' icon={loveMark} />
            </CardFooter>
        </Card>
    );
};

export default SlideItem;

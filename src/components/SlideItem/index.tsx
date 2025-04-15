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

import CustomBadge from '../CustomBadge';
import SideIcon from '../SideIcon';
import styles from './SlideItem.module.scss';

export type Slide = null;

const SlideItem = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    return (
        <Card
            _hover={{ shadow: 'md' }}
            borderRadius='8px'
            overflow='hidden'
            position='relative'
            maxW='md'
        >
            <Image
                objectFit='cover'
                src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Chakra UI'
            />
            <CardBody>
                <Heading fontSize='20px' lineHeight='28px' fontWeight='500'>
                    Солянка с грибами
                </Heading>
                {!isMobile && (
                    <Text fontSize='14px' lineHeight='20px'>
                        Как раз после праздников, когда мясные продукты еще остались, но никто их
                        уже не хочет, время варить солянку.
                    </Text>
                )}
            </CardBody>

            <CardFooter justify='space-between' flexWrap='wrap'>
                <CustomBadge text='Первые блюда' className={styles.badge} />

                <SideIcon text='1' icon={loveMark} />
            </CardFooter>
        </Card>
    );
};

export default SlideItem;

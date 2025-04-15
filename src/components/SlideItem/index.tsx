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

export type SlideProps = {
    image?: string;
    isFact?: boolean;
};

const SlideItem = ({ isFact, image }: SlideProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    return (
        <Card
            _hover={{ shadow: 'md' }}
            borderRadius='8px'
            overflow='hidden'
            position='relative'
            maxW='md'
        >
            {image && <Image objectFit='cover' src={image} alt='Chakra UI' />}
            <CardBody>
                <Heading fontSize='20px' lineHeight='28px' fontWeight='500'>
                    Солянка с грибами
                </Heading>
                {(!isMobile || isFact) && (
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

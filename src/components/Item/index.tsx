import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';

import pasta from '~/assets/img/pasta.jpg';
import loveMark from '~/assets/love-mark.svg';
import loveSmile from '~/assets/love-smile.svg';
import pan from '~/assets/sidebar/pan.svg';

import CustomBadge from '../CustomBadge';
import SideIcon from '../SideIcon';
import styles from './Item.module.scss';

const Item = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    return (
        <Card
            _hover={{ shadow: 'md' }}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            position='relative'
            variant='outline'
        >
            {!isMobile && (
                <CustomBadge
                    className={styles.recommendation}
                    icon='https://bit.ly/sage-adebayo'
                    text='Alex Cook рекомендует'
                    color='lime.150'
                />
            )}
            <Image objectFit='cover' maxW={{ base: '100%', sm: '50%' }} src={pasta} />

            <Stack>
                <CardHeader>
                    <Flex flexWrap='wrap' justifyContent='space-between'>
                        <CustomBadge icon={pan} text='Вторые блюда' color='lime.50' />
                        <Flex>
                            <SideIcon icon={loveMark} text='85' />
                            <SideIcon icon={loveSmile} text='152' />
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Heading size='md'>Кнели со спагетти</Heading>

                    {!isMobile && (
                        <Text py='2'>
                            Как раз после праздников, когда мясные продукты еще остались, но никто
                            их уже не хочет, время варить солянку.
                        </Text>
                    )}
                </CardBody>

                <CardFooter gap='10px' justifyContent='flex-end'>
                    <Button
                        leftIcon={<Image src={loveMark} />}
                        variant='outline'
                        colorScheme='dark'
                    >
                        {!isMobile && 'Сохранить'}
                    </Button>
                    <Button variant='solid' bg='black' color='white'>
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default Item;

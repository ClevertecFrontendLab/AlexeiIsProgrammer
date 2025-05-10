import {
    Box,
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
    useToast,
} from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import loveMark from '~/assets/love-mark.svg';
import loveSmile from '~/assets/love-smile.svg';
import { SOURCE_URL } from '~/constants';
import { CARD_LINK, FOOD_CARD } from '~/query/constants/test-id';
import { useLazyGetRecipeByIdQuery } from '~/query/services/recipes';
import { userFilterSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import { Recipe } from '~/types';

import CustomBadge from '../CustomBadge';
import HighlightedText from '../HighlightText';
import SideIcon from '../SideIcon';
import styles from './Item.module.scss';

type ItemProps = {
    item: Recipe;
    index: number;
    to: string;
};

const Item = memo(({ item, index, to }: ItemProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const isSmallMobile = useBreakpointValue({ base: true, md: false });
    const toast = useToast();
    const { search } = useAppSelector(userFilterSelector);

    const navigate = useNavigate();

    const [getRecipe] = useLazyGetRecipeByIdQuery();

    return (
        <Card
            data-test-id={`${FOOD_CARD}-${index}`}
            maxH='244px'
            _hover={{ shadow: 'md' }}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            position='relative'
            variant='outline'
        >
            <Image
                objectFit='cover'
                w={{ base: '100%', sm: '50%' }}
                src={`${SOURCE_URL}${item?.image}`}
                title={item.title}
            />

            <Stack
                py={isSmallMobile ? '8px' : '20px'}
                px={isSmallMobile ? '8px' : '24px'}
                gap={isSmallMobile ? '8px' : '24px'}
                w={{ base: '100%', sm: '50%' }}
            >
                <CardHeader p={0}>
                    <Flex flexWrap='wrap' justifyContent='space-between'>
                        <Box position={isSmallMobile ? 'absolute' : 'static'} top='8px' left='8px'>
                            {item.categoriesIds
                                ?.slice(0, 1)
                                .map((category) => (
                                    <CustomBadge
                                        key={category}
                                        category={category}
                                        color='lime.50'
                                    />
                                ))}
                        </Box>

                        <Flex>
                            <SideIcon icon={loveMark} text={`${item?.bookmarks || '-'}`} />
                            <SideIcon icon={loveSmile} text={`${item?.likes || '-'}`} />
                        </Flex>
                    </Flex>
                </CardHeader>
                <CardBody p={0}>
                    <Heading
                        size='md'
                        title={item?.title}
                        overflow='hidden'
                        whiteSpace='nowrap'
                        textOverflow='ellipsis'
                        fontSize='20px'
                        lineHeight='28px'
                        fontWeight='500'
                    >
                        <HighlightedText text={item.title} searchTerm={search} />
                    </Heading>

                    {!isMobile && (
                        <Text title={item?.description} className={styles.description}>
                            {item.description}
                        </Text>
                    )}
                </CardBody>

                <CardFooter p={0} gap='10px' justifyContent='flex-end'>
                    <Button
                        px='12px'
                        py='6px'
                        h='auto'
                        leftIcon={<Image src={loveMark} />}
                        variant='outline'
                        colorScheme='dark'
                    >
                        {!isMobile && 'Сохранить'}
                    </Button>
                    <Button
                        data-test-id={`${CARD_LINK}-${index}`}
                        onClick={() => {
                            getRecipe(item._id)
                                .unwrap()
                                .then(() => navigate(to))
                                .catch(toast);
                        }}
                        px='12px'
                        py='6px'
                        h='auto'
                        variant='solid'
                        bg='black'
                        color='white'
                    >
                        Готовить
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
});

export default Item;

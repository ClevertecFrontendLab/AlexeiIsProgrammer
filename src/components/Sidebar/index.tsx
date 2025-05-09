import { Box, Collapse, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router';

import ArrowDown from '~/assets/arrow-down.svg';
import ArrowUp from '~/assets/arrow-up.svg';
import exit from '~/assets/exit.svg';
import { SOURCE_URL } from '~/constants';
import { AppRoute, useGetCategoriesQuery } from '~/query/services/categories';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';

import styles from './Sidebar.module.scss';

type SidebarItemProps = {
    category: AppRoute;
};

const SidebarItem = ({ category: { title, icon, subCategories, category } }: SidebarItemProps) => {
    const { pathname } = useLocation();

    const currentCategory = getCurrentCategory(pathname);

    const isCategoryActive = currentCategory === category;

    return (
        <Box w='100%'>
            <Link
                to={`/${category}/${subCategories?.[0].category || ''}`}
                data-test-id={category === 'vegan' ? 'vegan-cuisine' : category}
            >
                <Flex
                    cursor='pointer'
                    alignItems='center'
                    justify='space-between'
                    _hover={{ bg: 'lime.50' }}
                    bg={isCategoryActive ? 'lime.100' : {}}
                    px='22px'
                    py='12px'
                >
                    <Flex alignItems='center' gap='12px'>
                        <Image src={`${SOURCE_URL}${icon}`} title={title} />
                        <Text
                            letterSpacing='0.4px'
                            lineHeight='24px'
                            fontWeight={isCategoryActive ? '700' : '500'}
                            fontSize='16px'
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >
                            {title}
                        </Text>
                    </Flex>
                    <Image src={!isCategoryActive ? ArrowDown : ArrowUp} />
                </Flex>
            </Link>
            <Collapse in={isCategoryActive}>
                {subCategories && (
                    <Box>
                        {subCategories.map((subCategory) => (
                            <Text
                                data-test-id={
                                    getCurrentSubcategory(pathname) === subCategory.category
                                        ? `${subCategory.category}-active`
                                        : null
                                }
                                className={`${styles.sub} ${getCurrentSubcategory(pathname) === subCategory.category ? styles.active : ''}`}
                                px='18px'
                                py='6px'
                                pl='66px'
                                _hover={{ bg: 'lime.50' }}
                                key={subCategory.category}
                                fontSize='16px'
                                fontWeight='500'
                                lineHeight='24px'
                                color='black'
                            >
                                <Link to={`/${category}/${subCategory.category}`}>
                                    {subCategory.title}
                                </Link>
                            </Text>
                        ))}
                    </Box>
                )}
            </Collapse>
        </Box>
    );
};

const Sidebar = () => {
    const { data: routes } = useGetCategoriesQuery();

    const menu = useMemo(() => routes?.filter((route) => route.subCategories) || [], [routes]);

    return (
        <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            h='100%'
            bg='white'
            borderRight='1px solid'
            borderColor='gray.200'
            py='10px'
            pt='24px'
        >
            <VStack py='10px' spacing={0} align='stretch'>
                {menu
                    .filter((category: AppRoute) => !category?.handle?.noMenu)
                    .map((category) => (
                        <SidebarItem key={category.category} category={category} />
                    ))}
            </VStack>

            <Flex direction='column' gap='16px' px='24px' mb='20px'>
                <Text fontWeight='500' fontSize='12px' color='blackAlpha.300'>
                    Версия программы 03.25
                </Text>
                <Text color='blackAlpha.700' fontSize='12px' lineHeight='16px'>
                    Все права защищены,
                    <br /> ученический файл, ©Клевер Технолоджи, 2025
                </Text>
                <Flex gap='6px'>
                    <Image src={exit} />
                    <Text color='black' fontSize='12px' fontWeight='600'>
                        Выход
                    </Text>
                </Flex>
            </Flex>
        </Box>
    );
};

export default Sidebar;

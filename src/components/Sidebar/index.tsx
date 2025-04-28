import { Box, Collapse, Flex, Image, Text, VStack } from '@chakra-ui/react';
import { Link, RouteObject, useLocation } from 'react-router';

import ArrowDown from '~/assets/arrow-down.svg';
import ArrowUp from '~/assets/arrow-up.svg';
import exit from '~/assets/exit.svg';
import { AppRoute, routes } from '~/routes';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';

import styles from './Sidebar.module.scss';

type SidebarItemProps = {
    category: RouteObject & AppRoute;
};

const SidebarItem = ({ category: { label, icon, children, path } }: SidebarItemProps) => {
    const { pathname } = useLocation();

    const currentCategory = getCurrentCategory(pathname);

    const isCategoryActive = currentCategory === path;

    return (
        <Box w='100%'>
            <Link
                data-test-id={path === 'vegan' ? 'vegan-cuisine' : path}
                to={`/${path}/${children?.[0].path || ''}`}
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
                        <Image src={icon} />
                        <Text
                            letterSpacing='0.4px'
                            lineHeight='24px'
                            fontWeight={isCategoryActive ? '700' : '500'}
                            fontSize='16px'
                        >
                            {label}
                        </Text>
                    </Flex>
                    <Image src={!isCategoryActive ? ArrowDown : ArrowUp} />
                </Flex>
            </Link>
            <Collapse in={isCategoryActive}>
                {children && (
                    <Box>
                        {children.map((category: AppRoute) => (
                            <Text
                                data-test-id={
                                    getCurrentSubcategory(pathname) === category.path
                                        ? `${category.path}-active`
                                        : null
                                }
                                className={`${styles.sub} ${getCurrentSubcategory(pathname) === category.path ? styles.active : ''}`}
                                px='18px'
                                py='6px'
                                pl='66px'
                                _hover={{ bg: 'lime.50' }}
                                key={category.path}
                                fontSize='16px'
                                fontWeight='500'
                                lineHeight='24px'
                                color='black'
                            >
                                <Link to={`/${path}/${category.path}`}>{category.label}</Link>
                            </Text>
                        ))}
                    </Box>
                )}
            </Collapse>
        </Box>
    );
};

const Sidebar = () => {
    console.log('routes', routes);

    const menu = routes[0]?.children || [];

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
                    .filter((category: AppRoute) => !category?.noMenu)
                    .map((category) => (
                        <SidebarItem key={category.path} category={category} />
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

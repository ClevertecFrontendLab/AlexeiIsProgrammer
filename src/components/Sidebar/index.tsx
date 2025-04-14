import { Box, Collapse, Flex, Image, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router';

import ArrowDown from '~/assets/arrow-down.svg';
import ArrowUp from '~/assets/arrow-up.svg';
import exit from '~/assets/exit.svg';
import apple from '~/assets/sidebar/apple.svg';
import baby from '~/assets/sidebar/baby.svg';
import bread from '~/assets/sidebar/bread.svg';
import browser from '~/assets/sidebar/browser.svg';
import carrot from '~/assets/sidebar/carrot.svg';
import cup from '~/assets/sidebar/cup.svg';
import fish from '~/assets/sidebar/fish.svg';
import green from '~/assets/sidebar/green.svg';
import heal from '~/assets/sidebar/heal.svg';
import kastrulya from '~/assets/sidebar/kastrulya.svg';
import pan from '~/assets/sidebar/pan.svg';
import van from '~/assets/sidebar/van.svg';
import violet from '~/assets/sidebar/violet.svg';

import styles from './Sidebar.module.scss';

type Sub = { label: string; value: string };

type Category = {
    label: string;
    icon: string;
    sub?: Sub[];
};

const categories: Category[] = [
    { label: 'Салаты', icon: violet },
    { label: 'Закуски', icon: apple },
    { label: 'Первые блюда', icon: kastrulya },
    { label: 'Вторые блюда', icon: pan },
    { label: 'Десерты, выпечка', icon: bread },
    { label: 'Блюда на гриле', icon: van },
    {
        label: 'Веганская кухня',
        icon: green,
        sub: [
            { label: 'Закуски', value: 'zakuski' },
            { label: 'Первые блюда', value: 'pervye-blyuda' },
            { label: 'Вторые блюда', value: 'vtorye-blyuda' },
            { label: 'Гарниры', value: 'garniry' },
            { label: 'Десерты', value: 'deserty' },
            { label: 'Выпечка', value: 'vypechka' },
            { label: 'Сыроедческие блюда', value: 'syroedcheskie-blyuda' },
            { label: 'Напитки', value: 'napitki' },
        ],
    },
    { label: 'Детские блюда', icon: baby },
    { label: 'Лечебное питание', icon: heal },
    { label: 'Национальные', icon: browser },
    { label: 'Соусы', icon: fish },
    { label: 'Напитки', icon: cup },
    { label: 'Заготовки', icon: carrot },
];

type SidebarItemProps = {
    category: Category;
};

const SidebarItem = ({ category: { label, icon, sub } }: SidebarItemProps) => {
    const { isOpen, onToggle } = useDisclosure();

    const { pathname } = useLocation();

    return (
        <Box w='100%'>
            <Flex
                cursor='pointer'
                alignItems='center'
                justify='space-between'
                _hover={{ bg: 'lime.50' }}
                bg={isOpen ? 'lime.100' : {}}
                onClick={onToggle}
                px='22px'
                py='12px'
            >
                <Flex alignItems='center' gap='12px'>
                    <Image src={icon} />
                    <Text
                        letterSpacing='0.4px'
                        lineHeight='24px'
                        fontWeight={isOpen ? '700' : '500'}
                        fontSize='16px'
                    >
                        {label}
                    </Text>
                </Flex>
                <Image src={!isOpen ? ArrowDown : ArrowUp} />
            </Flex>
            <Collapse in={isOpen}>
                {sub && (
                    <Box>
                        {sub.map((category: Sub) => (
                            <Text
                                className={`${styles.sub} ${pathname.substring(1) === category.value ? styles.active : ''}`}
                                px='18px'
                                py='6px'
                                pl='66px'
                                _hover={{ bg: 'lime.50' }}
                                key={category.value}
                                fontSize='16px'
                                fontWeight='500'
                                lineHeight='24px'
                                color='black'
                            >
                                <Link to={`/${category.value}`}>{category.label}</Link>
                            </Text>
                        ))}
                    </Box>
                )}
            </Collapse>
        </Box>
    );
};

const Sidebar = () => (
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
            {categories.map((category, index) => (
                <SidebarItem key={index} category={category} />
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

export default Sidebar;

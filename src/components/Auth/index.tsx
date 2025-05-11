import {
    Box,
    Flex,
    Image,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import auth from '~/assets/auth.jpg';
import logo from '~/assets/logo.svg';
import Login from '~/pages/Login';
import Registration from '~/pages/Registration';

import styles from './Auth.module.scss';

const tabs = [
    { label: 'Вход на сайт', value: '/login', component: <Login /> },
    { label: 'Регистрация', value: '/registration', component: <Registration /> },
];

const Auth = () => {
    const { pathname } = useLocation();

    const isMobile = useBreakpointValue({ base: true, md: false });

    const navigate = useNavigate();

    const currentIndex = tabs.findIndex((tab) => tab.value === pathname);

    return (
        <Box className={styles.container}>
            <SimpleGrid flex='1' templateColumns={isMobile ? '1fr' : '1fr 1fr'}>
                <Flex
                    direction='column'
                    alignItems='center'
                    justify='flex-start'
                    position='relative'
                >
                    <Image src={logo} mb='80px' h={isMobile ? '38px' : '64px'} />

                    <Box w='100%' maxW='460px' mx='auto'>
                        <Tabs isLazy index={currentIndex}>
                            <TabList
                                justifyContent={isMobile ? 'flex-start' : 'center'}
                                pb='5px'
                                overflowX='auto'
                                flexWrap={isMobile ? 'nowrap' : 'wrap'}
                                borderColor='blackAlpha.200'
                            >
                                {tabs.map((tab) => (
                                    <Tab
                                        flexShrink={0}
                                        color='lime.800'
                                        _selected={{ borderColor: 'lime.700', color: 'lime.700' }}
                                        value={tab.value}
                                        key={tab.value}
                                        onClick={() => navigate(tab.value)}
                                    >
                                        {tab.label}
                                    </Tab>
                                ))}
                            </TabList>

                            <TabPanels>
                                {tabs.map(({ component, value }) => (
                                    <TabPanel key={value} overflow='auto'>
                                        {component}
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </Tabs>
                    </Box>

                    <Text
                        p='10px'
                        position='absolute'
                        left='20px'
                        bottom='20px'
                        fontWeight='600'
                        fontSize='12px'
                    >
                        ̶Все права защищены, ученический файл, ©Клевер Технолоджи, 2025
                    </Text>
                </Flex>
                {!isMobile && (
                    <Box overflow='hidden' position='relative'>
                        <Image objectFit='cover' w='100%' h='100%' src={auth} alt='Auth photo' />
                        <Text
                            position='absolute'
                            p='10px'
                            fontWeight='600'
                            fontSize='12px'
                            right='20px'
                            bottom='20px'
                        >
                            ̶ Лучший сервис для ваших кулинарных побед
                        </Text>
                    </Box>
                )}
            </SimpleGrid>
        </Box>
    );
};

export default Auth;

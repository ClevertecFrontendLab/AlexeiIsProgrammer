import { EditIcon } from '@chakra-ui/icons';
import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    useBreakpointValue,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';
import type React from 'react';

import Footer from '../Footer';
import FooterButton from '../FooterButton';
import Header from '../Header';
import Sidebar from '../Sidebar';
import SideIcons from '../SideIcons';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');
    const { isOpen, onClose } = useDisclosure();

    return (
        <Flex direction='column' minH='100vh'>
            <Header />

            <Flex flex='1'>
                {!isMobile && (
                    <Box
                        zIndex='10'
                        as='aside'
                        w='260px'
                        bg='white'
                        borderRight='1px solid'
                        borderColor='gray.200'
                        h='calc(100vh - 80px)'
                        position='fixed'
                        top={isMobile ? '64px' : '80px'}
                        overflowY='auto'
                        className={styles.sidebar}
                    >
                        <Sidebar />
                    </Box>
                )}

                <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerBody p={0}>
                            <Sidebar />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                <Box
                    as='main'
                    flex='1'
                    p={{ base: 4, md: 6 }}
                    mt={isMobile ? '64px' : '80px'}
                    marginLeft={!isMobile ? '256px' : {}}
                    paddingRight={!isMobile ? '280px !important' : {}}
                    paddingBottom={isSmallMobile ? '100px' : {}}
                >
                    {children}
                </Box>

                <Footer />
                {!isMobile && (
                    <Flex
                        h='100%'
                        justifyContent='space-between'
                        py='76px'
                        position='fixed'
                        right='15px'
                        direction='column'
                    >
                        <SideIcons fixed />
                        <FooterButton
                            className={styles['footer-button']}
                            icon={EditIcon}
                            name='Записать рецепт'
                            active
                            main
                        />
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
};

export default Layout;

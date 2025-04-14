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
} from '@chakra-ui/react';
import type React from 'react';

import Header from '../Header';
import Sidebar from '../Sidebar';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const { isOpen, onClose } = useDisclosure();

    return (
        <Flex direction='column' minH='100vh'>
            <Header />

            <Flex flex='1'>
                {!isMobile && (
                    <Box
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
                    mt={{ base: 4, md: 0 }}
                    marginLeft={!isMobile ? '256px' : {}}
                >
                    {children}
                </Box>
            </Flex>
        </Flex>
    );
};

export default Layout;

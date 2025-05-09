import {
    Box,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
} from '@chakra-ui/react';
import { memo } from 'react';

import Breadcrumbs from '../Breadcrumbs';
import Sidebar from '../Sidebar';

type MobileMenuProps = {
    isOpen: boolean;
    onClose: () => void;
};

const MobileMenu = memo(({ isOpen, onClose }: MobileMenuProps) => (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay backdropFilter='blur(4px)' />
        <DrawerContent
            data-test-id='nav'
            borderBottomRadius='12px'
            boxShadow='xl'
            height='calc(100vh - 60px)'
            maxHeight='90vh'
        >
            <DrawerCloseButton data-test-id='close-icon' />
            <DrawerBody
                display='flex'
                flexDirection='column'
                borderBottomRadius='12px'
                boxShadow='xl'
                p={0}
            >
                <Box mt='70px' px='24px'>
                    <Breadcrumbs key='breadcrumbs' onClose={onClose} />
                </Box>

                <Sidebar />
            </DrawerBody>
        </DrawerContent>
    </Drawer>
));

export default MobileMenu;

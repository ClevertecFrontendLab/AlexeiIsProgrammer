import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Box,
    Flex,
    IconButton,
    Img,
    useBreakpointValue,
    useDisclosure,
    useMediaQuery,
} from '@chakra-ui/react';

import logo from '~/assets/logo.svg';
import logoCup from '~/assets/logo-cup.svg';

import Breadcrumbs from '../Breadcrumbs';
import CardAvatar from '../CardAvatar';
import SideIcons from '../SideIcons';
import styles from './Header.module.scss';

function Header() {
    const { onOpen } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');

    return (
        <Box
            as='header'
            position='fixed'
            w='100%'
            zIndex='1'
            h={isMobile ? '64px' : '80px'}
            bg='lime.50'
            p={4}
        >
            <Flex align='center' gap={isSmallMobile ? '14px' : isMobile ? '18px' : '10px'}>
                <Box marginRight={isMobile ? 'auto' : {}} w={!isMobile ? '256px' : {}}>
                    <Img src={isSmallMobile ? logoCup : logo} />
                </Box>

                {isMobile ? (
                    <>
                        <SideIcons />
                        <IconButton
                            mr={isSmallMobile ? {} : '8px'}
                            _active={{}}
                            _hover={{}}
                            bg='transparent'
                            as={HamburgerIcon}
                            w='20px'
                            h='20px'
                            aria-label='Open menu'
                            onClick={onOpen}
                            color='black'
                        />
                    </>
                ) : (
                    <>
                        <Box flex={1}>
                            <Breadcrumbs />
                        </Box>
                        <CardAvatar className={styles.avatar} />
                    </>
                )}
            </Flex>
        </Box>
    );
}

export default Header;

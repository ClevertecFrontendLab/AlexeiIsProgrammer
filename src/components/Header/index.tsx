import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Img, useBreakpointValue, useMediaQuery } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import logo from '~/assets/logo.svg';
import logoCup from '~/assets/logo-cup.svg';
import { HAMBURGER_ICON, HEADER } from '~/constants/test-id';

import Breadcrumbs from '../Breadcrumbs';
import CardAvatar from '../CardAvatar';
import SideIcons from '../SideIcons';
import styles from './Header.module.scss';

type HeaderProps = {
    isOpen?: boolean;
    onOpen?: () => void;
};

function Header({ isOpen, onOpen }: HeaderProps) {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');

    const navigate = useNavigate();

    return (
        <Box
            data-test-id={HEADER}
            as='header'
            position='fixed'
            w='100%'
            zIndex='10'
            h={isMobile ? '64px' : '80px'}
            bg='lime.50'
            p={4}
        >
            <Flex align='center' gap={isSmallMobile ? '14px' : isMobile ? '18px' : '10px'}>
                <Box marginRight={isMobile ? 'auto' : {}} w={!isMobile ? '256px' : {}}>
                    <Img
                        cursor='pointer'
                        onClick={() => navigate('/')}
                        src={isSmallMobile ? logoCup : logo}
                    />
                </Box>

                {isMobile ? (
                    <SideIcons />
                ) : (
                    <>
                        <Box flex={1} overflow='hidden'>
                            <Breadcrumbs key='breadcrumbs' />
                        </Box>
                        <CardAvatar
                            tag='@bake_and_pie UI'
                            name='Екатерина Константинопольская'
                            image='https://bit.ly/sage-adebayo'
                            className={styles.avatar}
                        />
                    </>
                )}

                {!isOpen && (
                    <IconButton
                        data-test-id={HAMBURGER_ICON}
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
                        display={isMobile ? 'block' : 'none'}
                    />
                )}
            </Flex>
        </Box>
    );
}

export default Header;

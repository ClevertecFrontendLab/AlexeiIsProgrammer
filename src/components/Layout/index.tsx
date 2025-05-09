import { EditIcon } from '@chakra-ui/icons';
import { Box, Flex, useBreakpointValue, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import type React from 'react';
import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router';

import { useGetCategoriesQuery } from '~/query/services/categories';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';

import CustomSpinner from '../CustomSpinner';
import Footer from '../Footer';
import FooterButton from '../FooterButton';
import Header from '../Header';
import MobileMenu from '../MobileMenu';
import Sidebar from '../Sidebar';
import SideIcons from '../SideIcons';
import styles from './Layout.module.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });
    const [isSmallMobile] = useMediaQuery('(max-width: 500px)');
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { data: categories, isLoading: areCategoriesLoading } = useGetCategoriesQuery();

    const { pathname } = useLocation();

    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);

    const isJuiciest =
        currentCategory === 'the-juiciest' || pathname === '/' || pathname === '/not-found';

    const category = useMemo(
        () => categories?.find((category) => category.category === currentCategory),
        [currentCategory, categories],
    );

    const subcategory = useMemo(
        () => categories?.find((category) => category.category === currentSubcategory),
        [currentSubcategory, categories],
    );

    if (categories && !(category && subcategory) && !isJuiciest) {
        return (
            <Navigate
                to={
                    category && !currentSubcategory
                        ? `/${category.category}/${category.subCategories?.[0].category}`
                        : `not-found`
                }
            />
        );
    }

    return (
        <Flex direction='column' minH='100vh'>
            <Header onOpen={onOpen} isOpen={isOpen} />

            <Flex flex='1'>
                {!isMobile && (
                    <Box
                        data-test-id='nav'
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

                <MobileMenu isOpen={isOpen} onClose={onClose} />

                <Box
                    as='main'
                    flex='1'
                    p={{ base: 4, md: 6 }}
                    mt={isMobile ? '64px' : '80px'}
                    width={!isMobile ? 'calc(100% - 256px - 280px)' : '100%'}
                    marginLeft={!isMobile ? '256px' : {}}
                    paddingRight={!isMobile ? '280px !important' : {}}
                    paddingBottom={isSmallMobile ? '100px' : {}}
                >
                    {areCategoriesLoading ? (
                        <CustomSpinner data-test-id='app-loader' spinnerOverflow />
                    ) : (
                        children
                    )}
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

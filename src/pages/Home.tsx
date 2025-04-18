import { Box } from '@chakra-ui/react';
import type React from 'react';
import { useLocation } from 'react-router';

import Blogs from '~/components/Blogs';
import Facts from '~/components/Facts';
import FilterComponent from '~/components/FilterComponent';
import Juciest from '~/components/Juciest';
import Slider from '~/components/Slider';
import Tabbed from '~/components/Tabbed';
import getCurrentRoute from '~/utils/getCurrentRoute';

const HomePage: React.FC = () => {
    const { pathname } = useLocation();

    console.log('currentRoute', pathname);
    const currentRoute = getCurrentRoute(pathname.substring(pathname.lastIndexOf('/') + 1));

    return (
        <Box>
            <FilterComponent title={currentRoute?.label || 'Приятного аппетита!'} />

            {!currentRoute && <Slider title='Новые рецепты' />}

            {currentRoute?.children ? (
                <Tabbed parent={currentRoute?.path || ''} tabs={currentRoute.children} />
            ) : (
                <Juciest />
            )}

            {!currentRoute && <Blogs />}

            <Facts />
        </Box>
    );
};

export default HomePage;

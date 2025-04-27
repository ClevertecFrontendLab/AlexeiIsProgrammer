import { Box } from '@chakra-ui/react';
import type React from 'react';
import { Outlet, useLocation } from 'react-router';

import Blogs from '~/components/Blogs';
import Facts from '~/components/Facts';
import FilterComponent from '~/components/FilterComponent';
import Slider from '~/components/Slider';
import getCurrentRoute from '~/utils/getCurrentRoute';

const HomePage: React.FC = () => {
    const { pathname } = useLocation();

    console.log('currentRoute', pathname);
    const currentRoute = getCurrentRoute(pathname.substring(pathname.lastIndexOf('/') + 1));

    return (
        <Box>
            <FilterComponent title={currentRoute?.label || 'Приятного аппетита!'} />

            {!currentRoute && <Slider title='Новые рецепты' />}

            <Outlet />

            {!currentRoute && <Blogs />}

            <Facts />
        </Box>
    );
};

export default HomePage;

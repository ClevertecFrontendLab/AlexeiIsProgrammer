import { Box } from '@chakra-ui/react';
import type React from 'react';
import { Outlet, useLocation } from 'react-router';

import Blogs from '~/components/Blogs';
import Facts from '~/components/Facts';
import FilterComponent from '~/components/FilterComponent';
import Juciest from '~/components/Juciest';
import Slider from '~/components/Slider';
import { useGetCategoriesQuery } from '~/query/services/categories';
import getCurrentRoute from '~/utils/getCurrentRoute';

const HomePage: React.FC = () => {
    const { data: routes } = useGetCategoriesQuery();
    const { pathname } = useLocation();

    const isJuiciest = pathname === '/the-juiciest';

    const currentRoute = getCurrentRoute(
        routes || [],
        pathname.substring(pathname.lastIndexOf('/') + 1),
    );

    console.log('HOMEEE', currentRoute);

    return (
        <Box>
            <FilterComponent
                title={isJuiciest ? 'Самое сочное' : currentRoute?.title || 'Приятного аппетита!'}
            />

            {!currentRoute && !isJuiciest && <Slider title='Новые рецепты' />}

            <Outlet />

            {pathname === '/' && <Juciest />}

            {!currentRoute && !isJuiciest && <Blogs />}

            <Facts />
        </Box>
    );
};

export default HomePage;

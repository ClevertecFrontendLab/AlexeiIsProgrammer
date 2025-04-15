import { Box } from '@chakra-ui/react';
import type React from 'react';
import { useLocation } from 'react-router';

import FilterComponent from '~/components/FilterComponent';
import Juciest from '~/components/Juciest';
import Slider from '~/components/Slider';
import { routes } from '~/main';

const HomePage: React.FC = () => {
    const { pathname } = useLocation();
    console.log('pathname', pathname, routes);

    const currentRoute = routes[0].children?.find((route) => route.path === pathname.substring(1));

    return (
        <Box>
            <FilterComponent title={currentRoute?.label || 'Приятного аппетита!'} />

            <Slider title='Новые рецепты' slides={[]} />

            <Juciest />
        </Box>
    );
};

export default HomePage;

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import getCurrentRoute from '~/utils/getCurrentRoute';

const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const pathnames = pathname.split('/').filter(Boolean);

    const buildPath = (index: number) => `#/${pathnames.slice(0, index + 1).join('/')}`;

    return (
        <Breadcrumb separator={<ChevronRightIcon color='gray.800' />}>
            <BreadcrumbItem color={pathnames.length > 0 ? 'blackAlpha.700' : 'black'}>
                <BreadcrumbLink href='#/'>Главная</BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames.map((name, index, arr) => (
                <BreadcrumbItem
                    color={index !== arr.length - 1 ? 'blackAlpha.700' : 'black'}
                    key={name}
                >
                    <BreadcrumbLink href={buildPath(index)}>
                        {getCurrentRoute(name)?.label || name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;

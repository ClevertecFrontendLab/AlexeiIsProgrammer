import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useLocation } from 'react-router';

import getCurrentRoute from '~/utils/getCurrentRoute';
import getRecipeById from '~/utils/getRecipeById';

import styles from './Breadcrumb.module.scss';

const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const pathnames = pathname.split('/').filter(Boolean);

    const buildPath = (index: number) => `/${pathnames.slice(0, index + 1).join('/')}`;

    return (
        <Breadcrumb
            data-test-id='breadcrumbs'
            sx={{
                '& > ol': {
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    padding: 0,
                    margin: 0,
                    listStyle: 'none',
                },
            }}
            separator={<ChevronRightIcon color='gray.800' />}
        >
            <BreadcrumbItem
                className={styles.breadcrumb}
                color={pathnames.length > 0 ? 'blackAlpha.700' : 'black'}
            >
                <BreadcrumbLink className={styles.link} href='/'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames.map((name, index, arr) => (
                <BreadcrumbItem
                    className={styles.breadcrumb}
                    color={index !== arr.length - 1 ? 'blackAlpha.700' : 'black'}
                    key={name}
                >
                    <BreadcrumbLink className={styles.link} href={buildPath(index)}>
                        {getCurrentRoute(name)?.label || getRecipeById(name)?.title || name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;

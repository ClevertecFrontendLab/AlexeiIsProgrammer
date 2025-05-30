import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router';

import { BREADCRUMBS } from '~/constants/test-id';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { THE_JUICIEST } from '~/router/constants/routes';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentRecipe from '~/utils/getCurrentRecipe';
import getCurrentRoute from '~/utils/getCurrentRoute';

import styles from './Breadcrumb.module.scss';

type BreadcrumbsProps = {
    onClose?: () => void;
};

const Breadcrumbs = ({ onClose }: BreadcrumbsProps) => {
    const { data: routes } = useGetCategoriesQuery();

    const { pathname } = useLocation();

    const currentRecipe = getCurrentRecipe(pathname);
    const pathnames = pathname.split('/').filter(Boolean);

    const currentCategory = getCurrentCategory(pathname);

    const category = useMemo(
        () => routes?.find((category) => category.category === currentCategory),
        [currentCategory, routes],
    );

    const { data: recipe } = useGetRecipeByIdQuery(currentRecipe, { skip: !currentRecipe });

    const buildPath = (index: number) =>
        `/${pathnames.slice(0, index + 1).join('/')}${index === 0 ? `/${category?.subCategories?.[0].category}` : ''}`;

    const getBreadcrumbName = useCallback(
        (name: string) =>
            pathname === `/${THE_JUICIEST}`
                ? 'Самое сочное '
                : getCurrentRoute(routes || [], name)?.title || recipe?.title || name,
        [pathname, routes, recipe],
    );

    if (pathname === '/not-found') return null;

    return (
        <Breadcrumb
            data-test-id={BREADCRUMBS}
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
            onClick={onClose}
        >
            <BreadcrumbItem
                className={styles.breadcrumb}
                color={pathnames.length > 0 ? 'blackAlpha.700' : 'black'}
            >
                <BreadcrumbLink as={Link} className={styles.link} to='/'>
                    Главная
                </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames.map((name, index, arr) => (
                <BreadcrumbItem
                    className={styles.breadcrumb}
                    color={index !== arr.length - 1 ? 'blackAlpha.700' : 'black'}
                    key={name}
                >
                    <BreadcrumbLink as={Link} className={styles.link} to={buildPath(index)}>
                        {getBreadcrumbName(name)}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;

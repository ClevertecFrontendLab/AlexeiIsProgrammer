import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { useLocation } from 'react-router';

const BREADCRUMB_LABELS = {
    vegan: 'Веганская кухня',
    juice: 'Самое сочное',
};

const Breadcrumbs = () => {
    const { pathname } = useLocation();
    const pathnames = pathname.split('/').filter(Boolean);

    const buildPath = (index: number) => `#/${pathnames.slice(0, index + 1).join('/')}`;

    return (
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink href='#/'>Главная</BreadcrumbLink>
            </BreadcrumbItem>
            {pathnames.map((name, index) => (
                <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={buildPath(index)}>
                        {BREADCRUMB_LABELS[name as keyof typeof BREADCRUMB_LABELS] || name}
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrumbs;

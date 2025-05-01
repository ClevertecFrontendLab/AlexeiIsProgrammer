import { Badge, Box, Image, Text } from '@chakra-ui/react';

import { useGetCategoriesQuery } from '~/query/services/categories';
import getCurrentRoute from '~/utils/getCurrentRoute';

import styles from './CustomBadge.module.scss';

type BadgeProps = {
    color?: string;
    icon?: string;
    text?: string;
    className?: string;
    category?: string;
};

const CustomBadge = ({ color, icon, text, className, category }: BadgeProps) => {
    const { data: routes } = useGetCategoriesQuery();
    const searchedCategory = category ? getCurrentRoute(routes || [], category) : null;

    return (
        <Badge bg={color} className={`${styles.badge} ${className || ''}`}>
            {(icon || searchedCategory?.icon) && (
                <Box overflow='hidden' borderRadius='50%'>
                    <Image
                        minW='16px'
                        minH='16px'
                        w='16px'
                        h='16px'
                        src={icon || searchedCategory?.icon}
                    />
                </Box>
            )}

            <Text>{text || searchedCategory?.title}</Text>
        </Badge>
    );
};

export default CustomBadge;

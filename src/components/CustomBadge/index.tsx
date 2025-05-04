import { Badge, Box, Image, Text } from '@chakra-ui/react';

import { SOURCE_URL } from '~/constants';
import { useGetCategoriesQuery } from '~/query/services/categories';
import getCategoryBySubcategoryId from '~/utils/getCategoryBySubcategoryId';

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

    const searchedCategory = category ? getCategoryBySubcategoryId(category, routes || []) : null;

    return (
        <Badge bg={color} className={`${styles.badge} ${className || ''}`}>
            {(icon || searchedCategory?.icon) && (
                <Box overflow='hidden' borderRadius='50%'>
                    <Image
                        minW='16px'
                        minH='16px'
                        w='16px'
                        h='16px'
                        src={icon || `${SOURCE_URL}${searchedCategory?.icon}`}
                    />
                </Box>
            )}

            <Text>{text || searchedCategory?.title}</Text>
        </Badge>
    );
};

export default CustomBadge;

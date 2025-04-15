import { Badge, Box, Image, Text } from '@chakra-ui/react';

import styles from './CustomBadge.module.scss';

type BadgeProps = {
    color?: string;
    icon?: string;
    text: string;
    className?: string;
};

const CustomBadge = ({ color, icon, text, className }: BadgeProps) => (
    <Badge bg={color} className={`${styles.badge} ${className || ''}`}>
        {icon && (
            <Box overflow='hidden' borderRadius='50%'>
                <Image w='16px' h='16px' src={icon} />
            </Box>
        )}

        <Text>{text}</Text>
    </Badge>
);

export default CustomBadge;

import { As, Box, Flex, Icon, Image, Text } from '@chakra-ui/react';

import styles from './FooterButton.module.scss';

type FooterButtonProps = {
    isIcon?: boolean;
    icon: As | string;
    name: string;
    active?: boolean;
    className?: string;
    main?: boolean;
};

const FooterButton = ({ isIcon, icon, name, active, className, main }: FooterButtonProps) => (
    <Flex
        className={`${styles.button} ${active ? styles.active : ''} ${main ? styles.main : ''} ${className}`}
    >
        <Box className={styles.icon}>
            {typeof icon === 'string' ? (
                <Image
                    className={`${styles.img} ${isIcon ? styles['is-icon'] : ''}`}
                    src={icon}
                    alt={name}
                />
            ) : (
                <Icon color={active ? 'lime.50' : 'blackAlpha.900'} as={icon} />
            )}
        </Box>

        <Text className={styles.name}>{name}</Text>
    </Flex>
);

export default FooterButton;

import { EditIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';

import home from '~/assets/home.svg';

import FooterButton from '../FooterButton';
import styles from './Footer.module.scss';

const Footer = () => (
    <Box position='fixed' bottom='0' left='0' w='100%' as='footer' bg='lime.50'>
        <Flex className={styles.list}>
            <FooterButton isIcon name='Главная' icon={home} active />
            <FooterButton name='Поиск' icon={SearchIcon} />
            <FooterButton name='Записать' icon={EditIcon} />
            <FooterButton name='Мой профиль' icon='https://bit.ly/sage-adebayo' />
        </Flex>
    </Box>
);

export default Footer;

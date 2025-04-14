import { Flex, Image, Text } from '@chakra-ui/react';

import group from '~/assets/group.svg';
import loveMark from '~/assets/love-mark.svg';
import loveSmile from '~/assets/love-smile.svg';

import styles from './SideIcons.module.scss';

type SideIconProps = {
    icon: string;
    text: string;
};

const SideIcon = ({ icon, text }: SideIconProps) => (
    <Flex gap='6px' px='8px' py='4px' alignItems='center'>
        <Image w='12px' h='12px' src={icon} />{' '}
        <Text lineHeight='14px' fontSize='14px' fontWeight='600' color='lime.600'>
            {text}
        </Text>
    </Flex>
);

const SideIcons = () => (
    <Flex className={styles.icons}>
        <SideIcon icon={loveMark} text='185' />
        <SideIcon icon={group} text='589' />
        <SideIcon icon={loveSmile} text='587' />
    </Flex>
);

export default SideIcons;

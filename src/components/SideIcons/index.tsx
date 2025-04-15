import { Flex } from '@chakra-ui/react';

import group from '~/assets/group.svg';
import loveMark from '~/assets/love-mark.svg';
import loveSmile from '~/assets/love-smile.svg';

import SideIcon from '../SideIcon';
import styles from './SideIcons.module.scss';

type SideIconsProps = {
    fixed?: boolean;
};

const SideIcons = ({ fixed }: SideIconsProps) => (
    <Flex className={`${styles.icons} ${fixed ? styles.fixed : ''}`}>
        <SideIcon className={fixed ? styles['fixed-icon'] : ''} icon={loveMark} text='185' />
        <SideIcon className={fixed ? styles['fixed-icon'] : ''} icon={group} text='589' />
        <SideIcon className={fixed ? styles['fixed-icon'] : ''} icon={loveSmile} text='587' />
    </Flex>
);

export default SideIcons;

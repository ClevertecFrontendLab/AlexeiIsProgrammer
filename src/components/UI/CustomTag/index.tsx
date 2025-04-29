import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import React from 'react';

import { OptionType } from '~/types';

type CustomTagProps = {
    item: OptionType;
    removeItem: (item: OptionType, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const CustomTag = ({ item, removeItem, ...props }: CustomTagProps) => (
    <Tag
        {...props}
        size='sm'
        key={typeof item === 'string' ? item : item.label}
        borderRadius='full'
        variant='outline'
        colorScheme='green'
        mr={1}
        mb={1}
    >
        <TagLabel>{typeof item === 'string' ? item : item.label}</TagLabel>
        <TagCloseButton onClick={(e) => removeItem(item, e)} />
    </Tag>
);

export default CustomTag;

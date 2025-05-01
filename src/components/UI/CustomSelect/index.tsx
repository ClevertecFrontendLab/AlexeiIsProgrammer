import { ChevronDownIcon, ChevronUpIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    Flex,
    Input,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItemOption,
    MenuList,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

import type { OptionType } from '~/types';

import CustomTag from '../CustomTag';
import styles from './CustomSelect.module.scss';

type CustomSelectProps = {
    value: OptionType[];
    options: OptionType[];
    onChange: (options: OptionType[]) => void;
    onOptionAdd?: (newOption: OptionType) => void;
    disabled?: boolean;
    placeholder?: string;
    isFilterOpened?: boolean;
};

export default function CustomSelect({
    value,
    options,
    onChange,
    onOptionAdd,
    disabled,
    placeholder = 'Выберите',
    isFilterOpened,
}: CustomSelectProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [newOption, setNewOption] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleItemSelect = (item: OptionType) => {
        if (value.find((curr) => curr.value === item.value)) {
            onChange(value.filter((i) => i.value !== item.value));
        } else {
            onChange([...value, item]);
        }
    };

    const removeItem = (item: OptionType, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter((i) => i.value !== item.value));
    };

    const addNewOption = () => {
        if (onOptionAdd && newOption && !options.find((option) => option.value === newOption)) {
            // onOptionAdd({ label: newOption, value: newOption });
            onChange([...value, { label: newOption, value: newOption }]);
            setNewOption('');
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewOption();
        }
    };

    const getTestId = () => {
        if (placeholder === 'Категория') return 'filter-menu-button-категория';
        if (placeholder === 'Выберите из списка') return 'allergens-menu-button';
        if (placeholder === 'Выберите из списка аллергенов...')
            return 'allergens-menu-button-filter';
        return '';
    };

    return (
        <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose} closeOnSelect={false}>
            <Box
                position='relative'
                height='auto'
                w='100%'
                minW='270px'
                maxW='270px'
                textAlign='left'
                bg='white'
                borderWidth='1px'
                borderColor='gray.200'
                borderRadius='md'
                p={2}
                _hover={{ borderColor: disabled ? '' : 'gray.300' }}
            >
                <Flex zIndex={1} pr='20px' flexWrap='wrap' gap={1} flex='1'>
                    {value.length > 0 ? (
                        value.map((item) => (
                            <CustomTag
                                key={item.value}
                                item={item}
                                removeItem={removeItem}
                                className={styles.tag}
                            />
                        ))
                    ) : (
                        <Text color='gray.500'>{placeholder}</Text>
                    )}
                </Flex>
                <MenuButton
                    as={Button}
                    zIndex={1}
                    bg='transparent !important'
                    _hover={{ bg: 'transparent' }}
                    _focus={{ bg: 'transparent' }}
                    textAlign='center'
                    minW='auto'
                    h='100%'
                    position='absolute'
                    top='0'
                    right='0'
                    p={0}
                    data-test-id={getTestId()}
                    isDisabled={disabled}
                    pointerEvents={disabled ? 'none' : 'auto'}
                    rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    cursor={disabled ? 'not-allowed' : 'pointer'}
                >
                    <Text display='none'>{placeholder}</Text>
                </MenuButton>
            </Box>

            <MenuList
                zIndex={10}
                data-test-id={placeholder === 'Выберите из списка' ? 'allergens-menu' : ''}
                maxH='300px'
                overflowY='auto'
                w='270px'
            >
                {options.map((option, i) => (
                    <MenuItemOption
                        key={option.value}
                        value={option.value}
                        onClick={() => handleItemSelect(option)}
                        bg={i % 2 === 0 ? 'blackAlpha.100' : 'white'}
                        data-test-id={
                            option.label === 'Веганская кухня'
                                ? 'checkbox-веганская кухня'
                                : placeholder === 'Выберите из списка'
                                  ? `allergen-${i}`
                                  : placeholder === 'Выберите из списка аллергенов...'
                                    ? `allergen-${i}`
                                    : ''
                        }
                    >
                        <Checkbox
                            isChecked={Boolean(value.find((curr) => curr.value === option.value))}
                            colorScheme='green'
                            mr={2}
                            borderColor='lime.400'
                            pointerEvents='none'
                        >
                            {option.label}
                        </Checkbox>
                    </MenuItemOption>
                ))}

                {onOptionAdd && (
                    <>
                        <MenuDivider />
                        <Flex px={3} py={2} alignItems='center' gap='12px'>
                            <Input
                                data-test-id={
                                    (isFilterOpened &&
                                        placeholder === 'Выберите из списка аллергенов...') ||
                                    (!isFilterOpened && placeholder === 'Выберите из списка')
                                        ? 'add-other-allergen'
                                        : ''
                                }
                                ref={inputRef}
                                placeholder='Другой аллерген'
                                value={newOption}
                                onChange={(e) => setNewOption(e.target.value)}
                                onKeyDown={handleKeyDown}
                                borderColor='green.400'
                                _focus={{ borderColor: 'green.500' }}
                            />

                            <SmallAddIcon
                                as='button'
                                aria-label='icon'
                                data-test-id='add-allergen-button'
                                onClick={addNewOption}
                                color='white'
                                rounded='lg'
                                bg='lime.600'
                                cursor='pointer'
                                disabled={!newOption}
                            />
                        </Flex>
                    </>
                )}
            </MenuList>
        </Menu>
    );
}

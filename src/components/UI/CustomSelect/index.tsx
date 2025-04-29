import { ChevronDownIcon, ChevronUpIcon, SmallAddIcon } from '@chakra-ui/icons';
import { Box, Button, Checkbox, Flex, Input, InputGroup, Portal, Text } from '@chakra-ui/react';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { OptionType } from '~/types';

import CustomTag from '../CustomTag';

type CustomSelectProps = {
    value: OptionType[];
    options: OptionType[];
    onChange: (options: OptionType[]) => void;
    onOptionAdd?: (newOption: OptionType) => void;
    disabled?: boolean;
    placeholder?: string;
};

export default function CustomSelect({
    value,
    options,
    onChange,
    onOptionAdd,
    disabled,
    placeholder = 'Выберите',
}: CustomSelectProps) {
    const [newOption, setNewOption] = useState<string>('');

    const [isOpen, setIsOpen] = useState(false);

    const selectButtonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // useOutsideClick({
    //     ref: dropdownRef as RefObject<HTMLElement>,
    //     handler: () => (!disabled ? setIsOpen(false) : null),
    // });

    const toggleDropdown = () => {
        if (disabled) return;
        console.log('isOpen', isOpen);

        setIsOpen((prev) => !prev);
    };

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
            onOptionAdd({ label: newOption, value: newOption });
            onChange([...value, { label: newOption, value: newOption }]);
            setNewOption('');

            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addNewOption();
        }
    };

    const [dropdownStyle, setDropdownStyle] = useState({
        width: 0,
        top: 0,
        left: 0,
    });

    useEffect(() => {
        if (selectButtonRef.current && isOpen) {
            const rect = selectButtonRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const viewportWidth = window.innerWidth;
            const menuHeight = 300;
            const menuWidth = rect.width;

            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            const spaceRight = viewportWidth - rect.right;
            const spaceLeft = rect.left;

            const shouldOpenUp = spaceBelow < menuHeight && spaceAbove > spaceBelow;
            const top = shouldOpenUp
                ? rect.top + window.scrollY - menuHeight
                : rect.bottom + window.scrollY;

            const shouldOpenLeft = spaceRight < menuWidth && spaceLeft > spaceRight;
            const left = shouldOpenLeft
                ? rect.right + window.scrollX - menuWidth
                : rect.left + window.scrollX;

            setDropdownStyle({
                width: menuWidth,
                top,
                left,
            });
        }
    }, [isOpen]);

    return (
        <>
            <Box position='relative' mb={3} ref={selectButtonRef}>
                <Flex
                    data-test-id={
                        placeholder === 'Категория'
                            ? 'filter-menu-button-категория'
                            : placeholder === 'Выберите из списка...'
                              ? 'allergens-menu-button'
                              : placeholder === 'Выберите из списка аллергенов...'
                                ? 'allergens-menu-button-filter'
                                : ''
                    }
                    as='button'
                    disabled={disabled}
                    onClick={toggleDropdown}
                    w='100%'
                    maxW='270px'
                    textAlign='left'
                    bg='white'
                    borderWidth='1px'
                    borderColor='gray.200'
                    borderRadius='md'
                    p={2}
                    cursor={disabled ? 'not-allowed' : 'pointer'}
                    alignItems='center'
                    justifyContent='space-between'
                    _hover={{ borderColor: disabled ? '' : 'gray.300' }}
                >
                    <Flex flexWrap='wrap' gap={1} flex='1'>
                        {value.length > 0 ? (
                            value.map((item) => (
                                <CustomTag key={item.value} item={item} removeItem={removeItem} />
                            ))
                        ) : (
                            <Text color='gray.500'>{placeholder}</Text>
                        )}
                    </Flex>
                    <Box ml={2}>
                        {isOpen ? <ChevronUpIcon boxSize={4} /> : <ChevronDownIcon boxSize={4} />}
                    </Box>
                </Flex>
            </Box>

            <Portal>
                <Box
                    data-test-id={placeholder === 'Выберите из списка...' ? 'allergens-menu' : ''}
                    display={isOpen ? 'block' : 'none'}
                    ref={dropdownRef}
                    position='absolute'
                    zIndex={10000}
                    bg='white'
                    borderWidth='1px'
                    borderColor='gray.200'
                    borderRadius='md'
                    boxShadow='md'
                    maxH='300px'
                    overflowY='auto'
                    style={{
                        width: `${dropdownStyle.width}px`,
                        top: `${dropdownStyle.top}px`,
                        left: `${dropdownStyle.left}px`,
                    }}
                >
                    {options.map((option, i) => (
                        <Flex
                            key={option.value}
                            px={3}
                            py={2}
                            alignItems='center'
                            cursor='pointer'
                            _hover={{ bg: 'gray.50' }}
                            bg={i % 2 === 0 ? 'blackAlpha.100' : 'white'}
                        >
                            <Checkbox
                                data-test-id={
                                    option.label === 'Веганская кухня'
                                        ? 'checkbox-веганская кухня'
                                        : placeholder === 'Выберите из списка...'
                                          ? `allergen-${i}`
                                          : placeholder === 'Выберите из списка аллергенов...'
                                            ? `allergen-${i}`
                                            : ''
                                }
                                isChecked={Boolean(
                                    value.find((curr) => curr.value === option.value),
                                )}
                                colorScheme='green'
                                mr={2}
                                onChange={() => handleItemSelect(option)}
                                borderColor='lime.400'
                            >
                                {option.label}
                            </Checkbox>
                        </Flex>
                    ))}

                    {onOptionAdd && (
                        <Flex
                            alignItems='center'
                            gap='14px'
                            px={3}
                            py={2}
                            borderTopWidth='1px'
                            borderTopColor='gray.100'
                        >
                            <InputGroup size='md'>
                                <Input
                                    data-test-id='add-other-allergen'
                                    ref={inputRef}
                                    placeholder='Другой аллерген'
                                    value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    pr='2.5rem'
                                    borderColor='green.400'
                                    _focus={{ borderColor: 'green.500' }}
                                />
                            </InputGroup>
                            <Button
                                data-test-id='add-allergen-button'
                                onClick={addNewOption}
                                borderRadius='50px'
                                bg='lime.600'
                                p='2px'
                                h='auto'
                                minW='auto'
                                disabled={!newOption}
                            >
                                <SmallAddIcon color='white' />
                            </Button>
                        </Flex>
                    )}
                </Box>
            </Portal>
        </>
    );
}

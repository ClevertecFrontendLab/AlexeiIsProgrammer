import { SearchIcon } from '@chakra-ui/icons';
import {
    Flex,
    FormControl,
    FormLabel,
    IconButton,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Switch,
    Text,
    useBreakpointValue,
    useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import filter from '~/assets/filter.svg';
import {
    addAlergen,
    selectAlergens,
    setAreAllergensActive,
    setSearch,
    userFilterSelector,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import Filter from '../Filter';
import CustomSelect from '../UI/CustomSelect';

type FilterComponentProps = {
    title?: string;
    description?: string;
};

const FilterComponent = ({ title, description }: FilterComponentProps) => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    const { isOpen, onClose, onOpen } = useDisclosure();

    const [input, setInput] = useState('');

    const dispatch = useAppDispatch();

    const { search, activeAllergens, allergens, areAllergensActive } =
        useAppSelector(userFilterSelector);

    const onSearchHandle = (searchArg: string = '') => {
        const inputValue = searchArg || input || '';

        if (search === inputValue || inputValue.length <= 2) return;

        dispatch(setSearch(inputValue));
    };

    return (
        <Flex direction='column' alignItems='center'>
            {title && (
                <Text
                    color='black'
                    lineHeight={isMobile ? '24px' : '48px'}
                    fontSize={isMobile ? '24px' : '48px'}
                    fontWeight='700'
                    textAlign='center'
                >
                    {title}
                </Text>
            )}
            {description && (
                <Text
                    textAlign='center'
                    mt='12px'
                    color='blackAlpha.600'
                    fontWeight='500'
                    fontSize='16x'
                    lineHeight='24px'
                >
                    {description}
                </Text>
            )}
            <Flex direction='column' gap='16px'>
                <Flex gap='12px' mt={isMobile || !description ? '16px' : '32px'}>
                    <IconButton
                        onClick={onOpen}
                        icon={<Image src={filter} />}
                        aria-label='filter'
                        data-test-id='filter-button'
                    />
                    <InputGroup>
                        <Input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            data-test-id='search-input'
                            placeholder='Название или ингредиент...'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSearchHandle();
                                }
                            }}
                        />
                        <InputRightElement>
                            <SearchIcon
                                pointerEvents={input.length > 2 ? 'auto' : 'none'}
                                data-test-id='search-button'
                                onClick={() => {
                                    onSearchHandle();
                                }}
                                cursor='pointer'
                                color='black'
                            />
                        </InputRightElement>
                    </InputGroup>
                </Flex>
                {!isMobile && (
                    <Flex gap='16px'>
                        <FormControl w='auto' display='flex' alignItems='center'>
                            <FormLabel
                                whiteSpace='nowrap'
                                fontSize='16px'
                                color='black'
                                htmlFor='allergens'
                                mb='0'
                            >
                                Исключить мои аллергены
                            </FormLabel>
                            <Switch
                                data-test-id='allergens-switcher'
                                checked={areAllergensActive}
                                onChange={(e) => {
                                    const isChecked = e.target.checked;

                                    if (!isChecked) {
                                        dispatch(selectAlergens([]));
                                    }

                                    dispatch(setAreAllergensActive(isChecked));
                                }}
                                size='md'
                                id='allergens'
                                colorScheme='green'
                            />
                        </FormControl>
                        <CustomSelect
                            placeholder='Выберите из списка...'
                            value={activeAllergens}
                            options={allergens}
                            onChange={(allergens) => dispatch(selectAlergens(allergens))}
                            onOptionAdd={(allergen) => dispatch(addAlergen(allergen))}
                            disabled={!areAllergensActive}
                        />
                    </Flex>
                )}
            </Flex>
            {
                createPortal(
                    <Filter onClose={onClose} isOpen={isOpen} />,
                    document.body,
                ) as React.ReactNode
            }
        </Flex>
    );
};

export default FilterComponent;

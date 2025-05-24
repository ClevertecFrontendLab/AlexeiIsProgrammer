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
    ALLERGENS_SWITCHER,
    FILTER_BUTTON,
    LOADER_SEARCH_BLOCK,
    SEARCH_BUTTON,
    SEARCH_INPUT,
} from '~/constants/test-id';
import useSearch from '~/hooks/useSearch';
import {
    addAlergen,
    hasActiveFiltersSelector,
    setAreAllergensActive,
    setFilters,
    userFilterSelector,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { OptionType } from '~/types';

import CustomSpinner from '../CustomSpinner';
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
    const [localAllergens, setLocalAllergens] = useState<OptionType[]>([]);

    const dispatch = useAppDispatch();

    const { search, allergens, areAllergensActive } = useAppSelector(userFilterSelector);
    const hasActiveFilters = useAppSelector(hasActiveFiltersSelector);

    const {
        data: recipes,
        isLoading: areRecipesLoading,
        isFetching: areRecipesFetching,
    } = useSearch();

    const onSearchHandle = (searchArg: string = '') => {
        const inputValue = searchArg || input || '';

        if (inputValue.length <= 2 && localAllergens.length === 0) return;

        if (search !== inputValue || localAllergens.length > 0) {
            dispatch(
                setFilters([
                    { name: 'search', value: inputValue },
                    { name: 'activeAllergens', value: localAllergens },
                ]),
            );
        }
    };

    return (
        <Flex
            mx='auto'
            maxW='900px'
            p='32px'
            px={isMobile ? '0px' : '190px'}
            boxShadow={hasActiveFilters ? 'xl' : 'none'}
            transition='.3s ease all'
            direction='column'
            alignItems='center'
            borderRadius='24px'
        >
            {recipes?.data ? (
                recipes.data.length > 0 ? (
                    <Text
                        color='black'
                        lineHeight={isMobile ? '24px' : '48px'}
                        fontSize={isMobile ? '24px' : '48px'}
                        fontWeight='700'
                        textAlign='center'
                    >
                        {title}
                    </Text>
                ) : (
                    <Text fontWeight='600' fontSize='16px' lineHeight='24px' textAlign='center'>
                        По вашему запросу ничего не найдено.
                        <br />
                        Попробуйте другой запрос
                    </Text>
                )
            ) : (
                title && (
                    <Text
                        color='black'
                        lineHeight={isMobile ? '24px' : '48px'}
                        fontSize={isMobile ? '24px' : '48px'}
                        fontWeight='700'
                        textAlign='center'
                    >
                        {title}
                    </Text>
                )
            )}
            {!areRecipesLoading && areRecipesFetching ? (
                <CustomSpinner data-test-id={LOADER_SEARCH_BLOCK} />
            ) : (
                <>
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
                                data-test-id={FILTER_BUTTON}
                            />
                            <InputGroup>
                                <Input
                                    borderColor={
                                        recipes?.data && recipes.data.length > 0 && hasActiveFilters
                                            ? 'green'
                                            : 'auto'
                                    }
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    data-test-id={SEARCH_INPUT}
                                    placeholder='Название или ингредиент...'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            onSearchHandle();
                                        }
                                    }}
                                />
                                <InputRightElement>
                                    <SearchIcon
                                        pointerEvents={
                                            input.length > 2 || localAllergens.length > 0
                                                ? 'auto'
                                                : 'none'
                                        }
                                        data-test-id={SEARCH_BUTTON}
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
                                        data-test-id={ALLERGENS_SWITCHER}
                                        isChecked={areAllergensActive}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;

                                            if (!isChecked) {
                                                setLocalAllergens([]);
                                            }

                                            dispatch(setAreAllergensActive(isChecked));
                                        }}
                                        size='md'
                                        id='allergens'
                                        colorScheme='green'
                                    />
                                </FormControl>
                                <CustomSelect
                                    isFilterOpened={isOpen}
                                    placeholder='Выберите из списка'
                                    value={localAllergens}
                                    options={allergens}
                                    onChange={(allergens) => {
                                        setLocalAllergens(allergens);
                                    }}
                                    onOptionAdd={(allergen) => dispatch(addAlergen(allergen))}
                                    disabled={!areAllergensActive}
                                />
                            </Flex>
                        )}
                    </Flex>
                </>
            )}
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

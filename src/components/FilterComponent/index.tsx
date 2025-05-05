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
import { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router';

import filter from '~/assets/filter.svg';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useGetRecipesQuery } from '~/query/services/recipes';
import {
    addAlergen,
    selectAlergens,
    setAreAllergensActive,
    setSearch,
    userFilterSelector,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import getCurrentCategory from '~/utils/getCurrentCategory';

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

    const dispatch = useAppDispatch();

    const { search, activeAllergens, allergens, areAllergensActive, meats, sides, page } =
        useAppSelector(userFilterSelector);

    const notEmptyFilters = activeAllergens.length > 0 || input.length > 0;

    const { data: categories } = useGetCategoriesQuery();

    const { pathname } = useLocation();

    const currentCategory = getCurrentCategory(pathname);

    const isJuiciest = currentCategory === 'the-juiciest' || pathname === '/';

    const category = useMemo(
        () => categories?.find((category) => category.category === currentCategory),
        [currentCategory, categories],
    );

    const {
        data: recipes,
        isLoading: areRecipesLoading,
        isFetching: areRecipesFetching,
    } = useGetRecipesQuery(
        {
            page: 1,
            limit: pathname === '/' ? 4 : 8 * page,
            allergens: activeAllergens.map((m) => m.value).join(','),
            searchString: search,
            meat: meats.map((m) => m.value).join(','),
            garnish: sides.map((m) => m.value).join(','),
            subcategoriesIds: category?.subCategories?.map((s) => s._id).join(','),
            sortBy: isJuiciest ? 'likes' : '',
            sortOrder: isJuiciest ? 'desc' : '',
        },
        { skip: !category && !isJuiciest },
    );

    const onSearchHandle = (searchArg: string = '') => {
        const inputValue = searchArg || input || '';

        if (search === inputValue || inputValue.length <= 2) return;

        dispatch(setSearch(inputValue));
    };

    return (
        <Flex
            maxW='900px'
            p='32px'
            px={isMobile ? '0px' : '190px'}
            boxShadow={notEmptyFilters ? 'xl' : 'none'}
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
                <CustomSpinner data-test-id='loader-search-block' />
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
                                        isChecked={areAllergensActive}
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
                                    isFilterOpened={isOpen}
                                    placeholder='Выберите из списка'
                                    value={activeAllergens}
                                    options={allergens}
                                    onChange={(allergens) => dispatch(selectAlergens(allergens))}
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

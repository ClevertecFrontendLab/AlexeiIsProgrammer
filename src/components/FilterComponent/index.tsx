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
import { useLocation } from 'react-router';

import filter from '~/assets/filter.svg';
import {
    ALLERGENS_SWITCHER,
    FILTER_BUTTON,
    LOADER_SEARCH_BLOCK,
    SEARCH_BUTTON,
    SEARCH_INPUT,
} from '~/constants/test-id';
import { useGetCategoriesQuery, useGetCategoryByIdQuery } from '~/query/services/categories';
import {
    useGetRecipesByCategoryQuery,
    useGetRecipesQuery,
    useLazyGetRecipesQuery,
} from '~/query/services/recipes';
import { MAIN, THE_JUICIEST } from '~/router/constants/routes';
import {
    addAlergen,
    hasActiveFiltersSelector,
    setAreAllergensActive,
    setFilters,
    userFilterSelector,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import getCurrentCategory from '~/utils/getCurrentCategory';
import getCurrentRoute from '~/utils/getCurrentRoute';
import getCurrentSubcategory from '~/utils/getCurrentSubcategory';
import transformAllergen from '~/utils/transformAllergen';

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
    const hasActiveFilters = useAppSelector(hasActiveFiltersSelector);

    const { data: categories } = useGetCategoriesQuery();

    const [getRecipes, { isFetching: areAllRecipesLazyFetching }] = useLazyGetRecipesQuery();

    const { pathname } = useLocation();

    const currentCategory = getCurrentCategory(pathname);
    const currentSubcategory = getCurrentSubcategory(pathname);
    const currentRoute = getCurrentRoute(categories || [], currentCategory);

    const { data: category } = useGetCategoryByIdQuery(currentRoute?._id || '', {
        skip: !currentRoute?._id,
    });

    const subcategory = category?.subCategories?.find((sub) => sub.category === currentSubcategory);

    const isJuiciest = currentCategory === THE_JUICIEST || pathname === MAIN;

    const {
        data: recipesByCategory,
        isError: isRecipesByCategoryError,
        isSuccess: isRecipesByCategorySuccess,
    } = useGetRecipesByCategoryQuery(
        {
            id: subcategory?._id || '',
            page,
            limit: pathname === MAIN ? 4 : 8,
            allergens: activeAllergens.map((m) => transformAllergen(m.value)).join(','),
            searchString: search,
        },
        { skip: !subcategory || isJuiciest },
    );

    const {
        data: allRecipes,
        isError: isAllRecipesError,
        isLoading: areAllRecipesLoading,
        isFetching: areAllRecipesFetching,
    } = useGetRecipesQuery(
        {
            page,
            limit: pathname === MAIN && !hasActiveFilters ? 4 : 8,
            allergens: activeAllergens.map((m) => transformAllergen(m.value)).join(','),
            searchString: search,
            meat: meats.map((m) => m.value).join(','),
            garnish: sides.map((m) => m.value).join(','),
            subcategoriesIds: category?.subCategories?.map((s) => s._id).join(','),
            sortBy:
                currentCategory === THE_JUICIEST || (pathname === MAIN && !hasActiveFilters)
                    ? 'likes'
                    : '',
            sortOrder:
                currentCategory === THE_JUICIEST || (pathname === MAIN && !hasActiveFilters)
                    ? 'desc'
                    : '',
        },
        { skip: !category && !isJuiciest },
    );

    const [recipes, _, areRecipesLoading] = !isJuiciest
        ? [recipesByCategory, isRecipesByCategoryError, false, isRecipesByCategorySuccess]
        : [
              allRecipes,
              isAllRecipesError,
              areAllRecipesLazyFetching || areAllRecipesLoading || areAllRecipesFetching,
          ];

    const onSearchHandle = (searchArg: string = '') => {
        const inputValue = searchArg || input || '';

        if (inputValue.length <= 2 && activeAllergens.length === 0) return;

        if (search !== inputValue) {
            dispatch(setFilters([{ name: 'search', value: inputValue }]));
        } else {
            getRecipes({
                page,
                limit: pathname === MAIN && !hasActiveFilters ? 4 : 8,
                allergens: activeAllergens.map((m) => transformAllergen(m.value)).join(','),
                searchString: search,
                meat: meats.map((m) => m.value).join(','),
                garnish: sides.map((m) => m.value).join(','),
                subcategoriesIds: category?.subCategories?.map((s) => s._id).join(','),
                sortBy:
                    currentCategory === THE_JUICIEST || (pathname === MAIN && !hasActiveFilters)
                        ? 'likes'
                        : '',
                sortOrder:
                    currentCategory === THE_JUICIEST || (pathname === MAIN && !hasActiveFilters)
                        ? 'desc'
                        : '',
            });
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
            {areRecipesLoading ? (
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
                                            input.length > 2 || activeAllergens.length > 0
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
                                                dispatch(
                                                    setFilters([
                                                        { name: 'activeAllergens', value: [] },
                                                    ]),
                                                );
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
                                    onChange={(allergens) =>
                                        dispatch(
                                            setFilters([
                                                { name: 'activeAllergens', value: allergens },
                                            ]),
                                        )
                                    }
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

import {
    Box,
    Button,
    Checkbox,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    FormControl,
    FormLabel,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import { routes } from '~/routes';
import {
    addAlergen,
    selectAlergens,
    selectAuthors,
    selectCategories,
    selectMeats,
    selectSides,
    setAreAllergensActive,
    userFilterSelector,
} from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { OptionType } from '~/types';

import CustomSelect from '../UI/CustomSelect';
import CustomTag from '../UI/CustomTag';

const authorOptions = [
    { label: 'Романов', value: 'Романов' },
    { label: 'Экзюпери', value: 'Экзюпери' },
    { label: 'Пушкин', value: 'Пушкин' },
    { label: 'Ивлев', value: 'Ивлев' },
    { label: 'Высоцкая', value: 'Высоцкая' },
];
const meatOptions = [
    { label: 'Курица', value: 'Chicken' },
    { label: 'Свинина', value: 'Pork' },
    { label: 'Говядина', value: 'Beef' },
    { label: 'Индейка', value: 'Turkey' },
    { label: 'Утка', value: 'Duck' },
];

const secondaryOptions = [
    { label: 'Картошка', value: 'potatoes' },
    { label: 'Гречка', value: 'buckwheat' },
    { label: 'Паста', value: 'pasta' },
    { label: 'Спагетти', value: 'spaghetti' },
    { label: 'Рис', value: 'rice' },
    { label: 'Капуста', value: 'cabbage' },
    { label: 'Фасоль', value: 'beans' },
    { label: 'Другие овощи', value: 'other vegetables' },
];

type FilterProps = {
    isOpen: boolean;
    onClose: () => void;
};

const Filter = ({ isOpen, onClose }: FilterProps) => {
    const categoryOptions = routes?.[0]?.children
        .filter((item) => !item.noMenu)
        .map((route) => ({
            label: route?.label,
            value: route.path,
        }));

    const dispatch = useAppDispatch();

    const { allergens, areAllergensActive } = useAppSelector(userFilterSelector);

    const handleItemSelect = (
        options: OptionType[],
        item: OptionType,
        set: React.Dispatch<React.SetStateAction<OptionType[]>>,
    ) => {
        if (options.includes(item)) {
            set(options.filter((i) => i.value !== item.value));
        } else {
            set([...options, item]);
        }
    };

    const [localCategories, setCategories] = useState<OptionType[]>([]);
    const [localAuthors, setAuthors] = useState<OptionType[]>([]);
    const [localMeats, setMeats] = useState<OptionType[]>([]);
    const [localSides, setSides] = useState<OptionType[]>([]);
    const [localAllergens, setAllergens] = useState<OptionType[]>([]);

    const isFindRecipeDisabled =
        localMeats.length === 0 &&
        localSides.length === 0 &&
        localAuthors.length === 0 &&
        localCategories.length === 0 &&
        localAllergens.length === 0;

    // useEffect(() => {
    //     if (isOpen) {
    //         setCategories(categories);
    //         setAuthors(authors);
    //         setMeats(meats);
    //         setSides(sides);
    //         setAllergens(activeAllergens);
    //     }
    // }, [isOpen, activeAllergens, meats, sides, authors, categories]);
    const clearLocals = () => {
        setCategories([]);
        setAuthors([]);
        setMeats([]);
        setSides([]);
        setAllergens([]);
    };
    return (
        <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent data-test-id='filter-drawer'>
                <DrawerCloseButton
                    data-test-id='close-filter-drawer'
                    borderRadius='50px'
                    bg='black'
                    color='white'
                    w='24px'
                    h='24px'
                />
                <DrawerHeader>Фильтр</DrawerHeader>
                <DrawerBody>
                    <Flex gap='10px' direction='column'>
                        <CustomSelect
                            placeholder='Категория'
                            value={localCategories}
                            options={categoryOptions}
                            onChange={(categories) => setCategories(categories)}
                        />
                        <CustomSelect
                            placeholder='Поиск по автору'
                            value={localAuthors}
                            options={authorOptions}
                            onChange={(authors) => setAuthors(authors)}
                        />
                        <Flex direction='column'>
                            <Text fontWeight='500' fontSize='16px' lineHeight='24px'>
                                Тип мяса:
                            </Text>
                            {meatOptions.map((option) => (
                                <Checkbox
                                    key={option.value}
                                    isChecked={localMeats.includes(option)}
                                    colorScheme='green'
                                    onChange={() => handleItemSelect(localMeats, option, setMeats)}
                                    borderColor='lime.400'
                                >
                                    {option.label}
                                </Checkbox>
                            ))}
                        </Flex>
                        <Flex direction='column'>
                            <Text fontWeight='500' fontSize='16px' lineHeight='24px'>
                                Тип гарнира:
                            </Text>
                            {secondaryOptions.map((option) => (
                                <Checkbox
                                    data-test-id={
                                        option.value === 'potatoes' ? 'checkbox-картошка' : ''
                                    }
                                    key={option.value}
                                    isChecked={localSides.includes(option)}
                                    colorScheme='green'
                                    onChange={() => handleItemSelect(localSides, option, setSides)}
                                    borderColor='lime.400'
                                >
                                    {option.label}
                                </Checkbox>
                            ))}
                        </Flex>

                        <Box>
                            <FormControl w='auto' display='flex' alignItems='center'>
                                <FormLabel
                                    whiteSpace='nowrap'
                                    fontSize='16px'
                                    color='black'
                                    htmlFor='drawer-allergens'
                                    mb='0'
                                >
                                    Исключить аллергены
                                </FormLabel>
                                <Switch
                                    data-test-id='allergens-switcher-filter'
                                    isChecked={areAllergensActive}
                                    onChange={(e) => {
                                        const isChecked = e.target.checked;

                                        if (!isChecked) {
                                            setAllergens([]);
                                        }

                                        dispatch(setAreAllergensActive(isChecked));
                                    }}
                                    size='md'
                                    id='drawer-allergens'
                                    colorScheme='green'
                                />
                            </FormControl>
                            <CustomSelect
                                placeholder='Выберите из списка аллергенов...'
                                disabled={!areAllergensActive}
                                value={localAllergens}
                                options={allergens}
                                onChange={(allergens) => setAllergens(allergens)}
                                onOptionAdd={(allergen) => dispatch(addAlergen(allergen))}
                            />
                        </Box>
                    </Flex>
                </DrawerBody>
                <DrawerFooter flexDirection='column'>
                    <Flex flexWrap='wrap'>
                        {localCategories.map((category) => (
                            <CustomTag
                                data-test-id='filter-tag'
                                item={category}
                                removeItem={() =>
                                    setCategories(
                                        localCategories.filter((i) => i.value !== category.value),
                                    )
                                }
                            />
                        ))}
                        {localAuthors.map((author) => (
                            <CustomTag
                                data-test-id='filter-tag'
                                item={author}
                                removeItem={() =>
                                    setAuthors(localAuthors.filter((i) => i.value !== author.value))
                                }
                            />
                        ))}
                        {localMeats.map((meat) => (
                            <CustomTag
                                data-test-id='filter-tag'
                                item={meat}
                                removeItem={() => handleItemSelect(localMeats, meat, setMeats)}
                            />
                        ))}
                        {localSides.map((side) => (
                            <CustomTag
                                data-test-id='filter-tag'
                                item={side}
                                removeItem={() => handleItemSelect(localSides, side, setSides)}
                            />
                        ))}
                        {localAllergens.map((allergen) => (
                            <CustomTag
                                data-test-id='filter-tag'
                                item={allergen}
                                removeItem={() =>
                                    setAllergens(
                                        localAllergens.filter((i) => i.value !== allergen.value),
                                    )
                                }
                            />
                        ))}
                    </Flex>

                    <Flex gap='8px'>
                        <Button
                            data-test-id='clear-filter-button'
                            onClick={() => {
                                dispatch(selectMeats(localMeats));
                                dispatch(selectSides(localSides));
                                dispatch(selectAuthors(localAuthors));
                                dispatch(selectCategories(localCategories));
                                dispatch(selectAlergens(localAllergens));
                                clearLocals();
                                // onClose();
                            }}
                            variant='outline'
                            colorScheme='dark'
                        >
                            Очистить фильтр
                        </Button>
                        <Button
                            data-test-id='find-recipe-button'
                            isDisabled={isFindRecipeDisabled}
                            pointerEvents={isFindRecipeDisabled ? 'none' : 'auto'}
                            onClick={() => {
                                dispatch(selectMeats(localMeats));
                                dispatch(selectSides(localSides));
                                dispatch(selectAuthors(localAuthors));
                                dispatch(selectCategories(localCategories));
                                dispatch(selectAlergens(localAllergens));

                                clearLocals();

                                onClose();
                            }}
                            variant='solid'
                            bg='black'
                            color='white'
                        >
                            Найти рецепт
                        </Button>
                    </Flex>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default Filter;

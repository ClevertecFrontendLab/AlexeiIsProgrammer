import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { OptionType } from '~/types';

import { ApplicationState } from './configure-store';
export type AppState = typeof initialState;

const initialState = {
    filter: {
        search: '',
        allergens: [
            { label: 'Молочные продукты', value: 'Молочные продукты' },
            { label: 'Яйцо', value: 'Яйцо' },
            { label: 'Рыба', value: 'Рыба' },
            { label: 'Моллюски', value: 'Моллюски' },
            { label: 'Орехи', value: 'Орехи' },
            { label: 'Томат (помидор)', value: 'Томат (помидор)' },
            { label: 'Цитрусовые', value: 'Цитрусовые' },
            { label: 'Клубника (ягоды)', value: 'Клубника (ягоды)' },
            { label: 'Шоколад', value: 'Шоколад' },
        ] as OptionType[],
        meats: [] as OptionType[],
        sides: [] as OptionType[],
        authors: [] as OptionType[],
        categories: [] as OptionType[],
        activeAllergens: [] as OptionType[],
        areAllergensActive: false,
    },

    isLoading: false,
    error: '' as string | null,
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        selectAlergens(state, { payload: allergens }: PayloadAction<OptionType[]>) {
            state.filter.activeAllergens = allergens;
        },
        selectMeats(state, { payload: meats }: PayloadAction<OptionType[]>) {
            state.filter.meats = meats;
        },
        selectSides(state, { payload: sides }: PayloadAction<OptionType[]>) {
            state.filter.sides = sides;
        },
        selectAuthors(state, { payload: authors }: PayloadAction<OptionType[]>) {
            state.filter.authors = authors;
        },
        selectCategories(state, { payload: categories }: PayloadAction<OptionType[]>) {
            state.filter.categories = categories;
        },
        addAlergen(state, { payload: allergen }: PayloadAction<OptionType>) {
            state.filter.allergens.push(allergen);
        },
        // removeAllergen(state, { payload: filteredAllergen }: PayloadAction<unknown>) {
        //     state.filter.allergens = state.filter.allergens.filter(
        //         (allergen) => allergen !== filteredAllergen,
        //     );
        // },
        setSearch(state, { payload: search }: PayloadAction<string>) {
            state.filter.search = search;
        },
        setAreAllergensActive(state, { payload: areAllergensActive }: PayloadAction<boolean>) {
            state.filter.areAllergensActive = areAllergensActive;
        },
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;
export const userFilterSelector = (state: ApplicationState) => state.app.filter;

export const {
    setAppError,
    setAppLoader,
    selectAlergens,
    addAlergen,
    setSearch,
    setAreAllergensActive,
    selectMeats,
    selectSides,
    selectAuthors,
    selectCategories,
} = appSlice.actions;
export default appSlice.reducer;

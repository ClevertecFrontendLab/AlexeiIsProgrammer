import { OptionType, RecipeType } from '~/types';

const filterBySide = (items: RecipeType[], sides: OptionType[]): RecipeType[] =>
    sides.length > 0
        ? items.filter((recipe) => sides.map((side) => side.value).includes(recipe?.side || ''))
        : items;

export default filterBySide;

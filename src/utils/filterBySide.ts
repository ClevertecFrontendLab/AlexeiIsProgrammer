import { OptionType, Recipe } from '~/types';

const filterBySide = (items: Recipe[], sides: OptionType[]): Recipe[] =>
    sides.length > 0
        ? items.filter((recipe) => sides.map((side) => side.value).includes(recipe?.side || ''))
        : items;

export default filterBySide;

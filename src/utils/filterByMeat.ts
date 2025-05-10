import { OptionType, Recipe } from '~/types';

const filterByMeat = (items: Recipe[], meats: OptionType[]): Recipe[] =>
    meats.length > 0
        ? items.filter((recipe) => meats.map((meat) => meat.value).includes(recipe?.meat || ''))
        : items;

export default filterByMeat;

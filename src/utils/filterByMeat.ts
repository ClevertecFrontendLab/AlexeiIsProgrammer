import { OptionType, RecipeType } from '~/types';

const filterByMeat = (items: RecipeType[], meats: OptionType[]): RecipeType[] =>
    meats.length > 0
        ? items.filter((recipe) => meats.map((meat) => meat.value).includes(recipe?.meat || ''))
        : items;

export default filterByMeat;

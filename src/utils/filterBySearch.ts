import { RecipeType } from '~/types';

const filterBySearch = (items: RecipeType[], search: string): RecipeType[] =>
    items.filter((recipe) => recipe.title.toLowerCase().includes(search.toLowerCase()));

export default filterBySearch;

import { Recipe } from '~/types';

const filterBySearch = (items: Recipe[], search: string): Recipe[] =>
    items.filter((recipe) => recipe.title.toLowerCase().includes(search.toLowerCase()));

export default filterBySearch;

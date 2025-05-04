import { Recipe } from '~/types';

const getRecipesBySubcategory = (items: Recipe[], subcategory: string): Recipe[] =>
    subcategory ? items.filter((recipe) => recipe.categoriesIds.includes(subcategory)) : items;
// subcategory ? items.filter((recipe) => recipe.subcategory[0] === subcategory) : items;

export default getRecipesBySubcategory;

import { RecipeType } from '~/types';

const getRecipesBySubcategory = (items: RecipeType[], subcategory: string): RecipeType[] =>
    subcategory ? items.filter((recipe) => recipe.subcategory.includes(subcategory)) : items;
// subcategory ? items.filter((recipe) => recipe.subcategory[0] === subcategory) : items;

export default getRecipesBySubcategory;

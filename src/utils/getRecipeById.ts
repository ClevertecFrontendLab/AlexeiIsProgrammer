import { Recipe } from '~/types';

const getRecipeById = (id: string | undefined, recipes: Recipe[]): Recipe | undefined =>
    recipes?.find((recipe) => recipe._id === id);

export default getRecipeById;

import recipes from '../db.json';

const getRecipeById = (id: string | undefined) => recipes.find((recipe) => recipe.id === id);

export default getRecipeById;

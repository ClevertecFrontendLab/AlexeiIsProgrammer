import { RecipeType } from '~/types';

const filterAll =
    (...fns: ((items: RecipeType[], arg: unknown) => RecipeType[])[]) =>
    (...args: unknown[]) =>
    (recipes: RecipeType[]): RecipeType[] =>
        fns.reduce((acc, curr, i) => curr(acc, args[i]), recipes);

export default filterAll;

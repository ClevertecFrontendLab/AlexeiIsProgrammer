import { Recipe } from '~/types';

const filterAll =
    (...fns: ((items: Recipe[], arg: unknown) => Recipe[])[]) =>
    (...args: unknown[]) =>
    (recipes: Recipe[]): Recipe[] =>
        fns.reduce((acc, curr, i) => curr(acc, args[i]), recipes);

export default filterAll;

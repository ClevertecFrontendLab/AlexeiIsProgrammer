import { OptionType, RecipeType } from '~/types';

const filterByAuthor = (items: RecipeType[], authors: OptionType[]): RecipeType[] =>
    authors.length > 0
        ? items.filter((recipe) =>
              authors.map((author) => author.value).includes(recipe?.author || ''),
          )
        : items;

export default filterByAuthor;

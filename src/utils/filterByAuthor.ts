import { OptionType, Recipe } from '~/types';

const filterByAuthor = (items: Recipe[], authors: OptionType[]): Recipe[] =>
    authors.length > 0
        ? items.filter((recipe) =>
              authors.map((author) => author.value).includes(recipe?.author || ''),
          )
        : items;

export default filterByAuthor;

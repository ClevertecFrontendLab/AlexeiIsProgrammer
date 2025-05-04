import { OptionType, Recipe } from '~/types';

const filterByCategory = (items: Recipe[], categories: OptionType[]): Recipe[] =>
    categories.length > 0
        ? items.filter((recipe) =>
              recipe.categoriesIds.some((category) =>
                  categories.map((category) => category.value).includes(category),
              ),
          )
        : items;

export default filterByCategory;

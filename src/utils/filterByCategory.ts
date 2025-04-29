import { OptionType, RecipeType } from '~/types';

const filterByCategory = (items: RecipeType[], categories: OptionType[]): RecipeType[] =>
    categories.length > 0
        ? items.filter((recipe) =>
              recipe.category.some((category) =>
                  categories.map((category) => category.value).includes(category),
              ),
          )
        : items;

export default filterByCategory;

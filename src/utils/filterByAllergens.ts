import { OptionType, Recipe } from '~/types';

const filterByAllergens = (items: Recipe[], allergens: OptionType[]): Recipe[] => {
    const allergenTerms = allergens.map((allergen) => allergen.value.toLowerCase());

    return items.filter(
        (recipe) =>
            !recipe.ingredients.some((ingredient) => {
                const ingredientLower = ingredient.title.toLowerCase();

                return allergenTerms.some(
                    (allergen) =>
                        allergen.split(/[()]/)[0].trim().length > 0 &&
                        ingredientLower.includes(allergen.split(/[()]/)[0].trim().toLowerCase()),
                );
            }),
    );
};

export default filterByAllergens;

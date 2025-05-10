import { CategoryItem } from '~/query/services/categories';

const getRandomSubcategory = (categories: CategoryItem[]): CategoryItem | undefined => {
    if (!Array.isArray(categories) || categories.length === 0) return;

    const filteredCategories = categories.filter((category) => !category.subCategories);

    const randomIndex = Math.floor(Math.random() * filteredCategories.length);
    return filteredCategories[randomIndex];
};

export default getRandomSubcategory;

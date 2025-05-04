import { CategoryItem } from '~/query/services/categories';

const getCategoriesPath = (subcategoryId?: string, categories?: CategoryItem[]) => {
    const subcategory = categories?.find((category) => subcategoryId === category._id);
    const category = categories?.find((category) => category._id === subcategory?.rootCategoryId);

    return `${category?.category}/${subcategory?.category}`;
};

export default getCategoriesPath;

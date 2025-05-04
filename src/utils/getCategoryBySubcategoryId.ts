import { CategoryItem } from '~/query/services/categories';

const getCategoryBySubcategoryId = (categoryId?: string, categories?: CategoryItem[]) =>
    categories?.find(
        (category) =>
            category._id ===
            categories?.find((subcategory) => categoryId === subcategory._id)?.rootCategoryId,
    );

export default getCategoryBySubcategoryId;

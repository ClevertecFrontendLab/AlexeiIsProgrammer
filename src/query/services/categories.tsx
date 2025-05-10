import { RouteObject } from 'react-router';

import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';

export type SubcategoryItem = {
    title: string;
    category: string;
    rootCategoryId: string;
    _id: string;
};

export type CategoryItem = {
    _id: string;
    title: string;
    category: string;
    icon?: string;
    description?: string;
    rootCategoryId?: string;
    subCategories?: SubcategoryItem[];
};

export type AppRoute = RouteObject & CategoryItem;

export const categoriesApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORIES, Tags.CATEGORY_BY_ID],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategories: builder.query<CategoryItem[], void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORIES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORIES,
                }),

                providesTags: [Tags.CATEGORIES],
            }),
            getCategoryById: builder.query<CategoryItem, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.CATEGORIES}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORY_BY_ID,
                }),

                providesTags: [Tags.CATEGORY_BY_ID],
            }),
        }),
    });

export const { useGetCategoriesQuery, useGetCategoryByIdQuery } = categoriesApiSlice;

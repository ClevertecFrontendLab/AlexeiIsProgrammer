import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';
import { Recipe } from '~/types';
import clearEmptyParams from '~/utils/clearRequestParams';

type BaseRecipesResponse = {
    data: Recipe[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
};

type BaseRecipesParams = Partial<{
    page: number;
    limit: number;
    allergens: string;
    searchString: string;
}>;

type GetRecipesResponse = BaseRecipesResponse;

type GetRecipesByCategoryResponse = BaseRecipesResponse;

export type GetRecipesParams = Partial<{
    meat: string;
    garnish: string;
    subcategoriesIds: string;
    sortBy: 'likes' | 'createdAt' | '';
    sortOrder: 'asc' | 'desc' | '';
}> &
    BaseRecipesParams;

type GetRecipesByCategoryParams = {
    id: string;
} & BaseRecipesParams;

export const recipesApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [
            Tags.RECIPES,
            Tags.RECIPES_BY_CATEGORY,
            Tags.RECIPE_BY_ID,
            Tags.RECIPE_BY_USER_ID,
        ],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<GetRecipesResponse, GetRecipesParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                    params: clearEmptyParams(params),
                }),

                providesTags: [Tags.RECIPES],
            }),
            getRecipesByCategory: builder.query<
                GetRecipesByCategoryResponse,
                GetRecipesByCategoryParams
            >({
                query: ({ id, ...params }) => ({
                    url: `${ApiEndpoints.RECIPES}/category/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES_BY_CATEGORY,
                    params: clearEmptyParams(params),
                }),

                providesTags: [Tags.RECIPES_BY_CATEGORY],
            }),
            getRecipeById: builder.query<Recipe, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPES}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPE_BY_ID,
                }),

                providesTags: [Tags.RECIPE_BY_ID],
            }),
            getRecipeByUserId: builder.query<Recipe, string>({
                query: (userId) => ({
                    url: `${ApiEndpoints.RECIPES}/user/${userId}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPE_BY_USER_ID,
                }),

                providesTags: [Tags.RECIPE_BY_USER_ID],
            }),
        }),
    });

export const {
    useGetRecipesQuery,
    useGetRecipesByCategoryQuery,
    useGetRecipeByIdQuery,
    useGetRecipeByUserIdQuery,
    useLazyGetRecipesQuery,
    useLazyGetRecipeByIdQuery,
} = recipesApiSlice;

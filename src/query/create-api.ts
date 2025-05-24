import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://marathon-api.clevertec.ru',
    credentials: 'include',
    // prepareHeaders: (headers) => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         headers.set('Authorization', `Bearer ${token}`);
    //     }
    //     return headers;
    // },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
});

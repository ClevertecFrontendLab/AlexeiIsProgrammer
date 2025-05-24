import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { apiSlice } from '~/query/create-api.ts';

type AuthResponse = {
    statusText?: string;
    message: string;
    statusCode?: number;
    error?: string;
};

type SignupRequest = {
    email: string;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
};

type ResetPasswordRequest = {
    email: string;
    login: string;
    password: string;
    passwordConfirm: string;
};

type LoginRequest = {
    login: string;
    password: string;
};

type VerifyRequest = {
    token: string;
};

type ForgotPasswordRequest = {
    email: string;
};

type VerifyOtpRequest = {
    email: string;
    otpToken: string;
};

export const authApiSlice = apiSlice
    .enhanceEndpoints({
        addTagTypes: [
            Tags.SIGNUP,
            Tags.LOGIN,
            Tags.REFRESH,
            Tags.VERIFY,
            Tags.VERIFY_OTP,
            Tags.RESET_PASSWORD,
            Tags.FORGOT_PASSWORD,
            Tags.CHECK_AUTH,
        ],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            signup: builder.mutation<AuthResponse, SignupRequest>({
                query: (body) => ({
                    url: `${ApiEndpoints.AUTH}/signup`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.SIGNUP,
                    body,
                }),
                invalidatesTags: [Tags.SIGNUP],
            }),
            login: builder.mutation<AuthResponse, LoginRequest>({
                query: (body) => ({
                    url: `${ApiEndpoints.AUTH}/login`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.LOGIN,
                    body,
                }),
                invalidatesTags: [Tags.LOGIN],
            }),
            refresh: builder.query<AuthResponse, void>({
                query: () => ({
                    url: `${ApiEndpoints.AUTH}/refresh`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.REFRESH,
                }),
                providesTags: [Tags.REFRESH],
            }),
            checkAuth: builder.query<AuthResponse, void>({
                query: () => ({
                    url: `${ApiEndpoints.AUTH}/check-auth`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.CHECK_AUTH,
                }),
                providesTags: [Tags.CHECK_AUTH],
            }),
            verify: builder.query<AuthResponse, VerifyRequest>({
                query: (params) => ({
                    url: `${ApiEndpoints.AUTH}/verify`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.VERIFY,
                    params,
                }),
                providesTags: [Tags.VERIFY],
            }),
            forgotPassword: builder.mutation<AuthResponse, ForgotPasswordRequest>({
                query: (body) => ({
                    url: `${ApiEndpoints.AUTH}/forgot-password`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.FORGOT_PASSWORD,
                    body,
                }),
                invalidatesTags: [Tags.FORGOT_PASSWORD],
            }),
            verifyOtp: builder.mutation<AuthResponse, VerifyOtpRequest>({
                query: (body) => ({
                    url: `${ApiEndpoints.AUTH}/verify-otp`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.VERIFY_OTP,
                    body,
                }),
                invalidatesTags: [Tags.VERIFY_OTP],
            }),
            resetPassword: builder.mutation<AuthResponse, ResetPasswordRequest>({
                query: (body) => ({
                    url: `${ApiEndpoints.AUTH}/reset-password`,
                    method: 'POST',
                    apiGroupName: ApiGroupNames.AUTH,
                    name: EndpointNames.RESET_PASSWORD,
                    body,
                }),
                invalidatesTags: [Tags.RESET_PASSWORD],
            }),
        }),
    });

export const {
    useSignupMutation,
    useLoginMutation,
    useRefreshQuery,
    useLazyCheckAuthQuery,
    useCheckAuthQuery,
    useVerifyQuery,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApiSlice;

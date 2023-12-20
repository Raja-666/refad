import { api } from './api'

const forgetPasswordApi = api.injectEndpoints({
  endpoints: (builder) => ({
    forgetPasswordVerifymail: builder.mutation({
      query: (body) => ({
        url: 'admin/forgetPassword/verifyEmail',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    setNewPassword: builder.mutation({
      query: (body) => ({
        url: 'admin/forgetPassword/setNewPassword',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    setNewPattern: builder.mutation({
      query: (body) => ({
        url: 'admin/forgetPattern/setNewPattern',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: 'admin/changePawword/changeUpdate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    oldPatternCheck: builder.mutation({
      query: (body) => ({
        url: 'admin/changePattern/verifyOldPattern',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    loginTwoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'twoFactorVerification',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
  }),
})

export const {
  useForgetPasswordVerifymailMutation,
  useSetNewPasswordMutation,
  useSetNewPatternMutation,
  useChangePasswordMutation,
  useOldPatternCheckMutation,
  useLoginTwoFactorVerifyMutation,
} = forgetPasswordApi

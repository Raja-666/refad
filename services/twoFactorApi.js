import { api } from './api'
const token = localStorage.getItem('AdminId')

const twoFactorApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTwoFactorAuthentication: builder.mutation({
      query: (body) => ({
        url: 'twoFactorGetCode',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    twoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'twoFactorVerify',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    disableTwoFactorVerify: builder.mutation({
      query: (body) => ({
        url: 'disableTwoFactor',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
    adminchangepasswordData: builder.mutation({
      query: (body) => ({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: 'admin/changepassword',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['StopOrder'],
    }),
  }),
})

export const {
  useDisableTwoFactorVerifyMutation,
  useTwoFactorVerifyMutation,
  useGetTwoFactorAuthenticationMutation,
  useAdminchangepasswordDataMutation,
} = twoFactorApi

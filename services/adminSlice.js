import { api } from './api'
const token = localStorage.getItem('token')

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // gettodos: builder.query({
    //   query: () => ({
    //     headers: {
    //       authorization: `Bearer ${token}`,
    //     },
    //     url: '/loginform/display',
    //   }),
    //   providesTags: ['Todos'],
    // }),

    adminloginData: builder.mutation({
      query: (body) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        url: '/adminlogin',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Admin'],
    }),
  }),
})

export const { useAdminloginDataMutation } = adminApi

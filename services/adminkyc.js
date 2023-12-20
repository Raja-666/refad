import { api } from './api'
const token = localStorage.getItem('token')

const adminkycApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getkycdata: builder.query({
      query: (id) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        url: '/admin/kyc',
        params: { id },
      }),
      providesTags: ['Todos'],
    }),

    // adminloginData: builder.mutation({
    //   query: (body) => ({
    //     url: '/adminlogin',
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Admin'],
    // }),
  }),
})

export const { useGetkycdataQuery } = adminkycApi

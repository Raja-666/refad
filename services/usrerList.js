import { api } from './api'
const token = localStorage.getItem('token')

const userListApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getuserList: builder.query({
      query: (id) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        url: '/admin/userlist',
        params: { id },
      }),
      providesTags: ['Todos'],
    }),

    getfindsingleuser: builder.query({
      query: (id) => ({
        headers: {
          authorization: `Bearer ${token}`,
        },
        url: '/admin/singleuser',
        params: { id },
      }),
      providesTags: ['Todos'],
    }),

    colList: builder.mutation({
      query: (body) => ({
        url: '/admin/collection/list',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['col-status'],
    }),

    colUpdate: builder.mutation({
      query: (body) => ({
        url: '/admin/collection/update',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['col-status'],
    }),


    userList: builder.mutation({
      query: (body) => ({
        url: '/admin/user/list',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user-status'],
    }),

    userUpdate: builder.mutation({
      query: (body) => ({
        url: '/admin/user/update',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['user-update-status'],
    }),
    
  }),
})

export const { useGetuserListQuery, useGetfindsingleuserQuery , useColListMutation , useColUpdateMutation , useUserListMutation , useUserUpdateMutation} = userListApi

import { api } from './api'

const changepatternApi = api.injectEndpoints({
  endpoints: (builder) => ({
    oldPattern: builder.mutation({
      query: (body) => ({
        url: 'admin/oldPattern',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['changepattern'],
    }),
    newPattern: builder.mutation({
      query: (body) => ({
        url: 'admin/newPattern',
        method: 'POST',
        body: body,
      }),
      invalidatesTags: ['changepattern'],
    }),
  }),
})

export const { useOldPatternMutation, useNewPatternMutation } = changepatternApi

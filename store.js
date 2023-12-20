import { configureStore } from '@reduxjs/toolkit'

import { api } from './services/api'

export const stores = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

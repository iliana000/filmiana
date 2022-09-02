import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import filmsReducer from './features/films/filmsSlice'
import { sagaWatcher } from './features/films/sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    filters: filmsReducer,
  },
  middleware: [sagaMiddleware],
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

sagaMiddleware.run(sagaWatcher)

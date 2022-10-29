import { createAction, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { filmType } from '../../../types/films'

export const getFilms = createAction('films/getFilms')
export const addFilm = createAction<filmType>('films/addFilm')
export const removeFilm = createAction<string>('films/removeFilm')

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    isLoading: false,
    isLoaded: false,
    error: false,
    list: [] as filmType[],
  },
  reducers: {
    filmsLoaded(state, action) {
      state.isLoading = false
      state.list = action.payload
    },
    filmsError(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
    filmAdded(state, action) {
      state.isLoading = false
      state.list = [
        ...state.list,
        {
          _id: action.payload._id,
          title: action.payload.title,
          watched: false,
          tags: [],
        },
      ]
    },
    filmRemoved(state, action) {
      state.isLoading = false
      state.list = state.list.filter(f => f._id !== action.payload)
    },
    filmToggled(state, action) {
      const film = state.list.find(film => film._id === action.payload)
      if (film) film.watched = !film.watched // TODO: convert to counter, how many times it was watched
    },
  },
  extraReducers: builder => {
    builder.addMatcher(isAnyOf(getFilms, addFilm, removeFilm), state => {
      state.isLoading = true
    })
  },
})

export const { filmsLoaded, filmAdded, filmRemoved, filmsError, filmToggled } =
  filmsSlice.actions

export default filmsSlice.reducer

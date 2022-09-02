import { createSlice } from '@reduxjs/toolkit'

import { filmType } from '../../types/films'

const filmsSlice = createSlice({
  name: 'films',
  initialState: {
    isLoading: false,
    isLoaded: false,
    error: false,
    list: [] as filmType[],
  },
  reducers: {
    fetchFilms(state) {
      state.isLoading = true
    },
    filmsLoaded(state, action) {
      state.isLoading = false
      state.list = action.payload
    },
    filmAdded(state, action) {
      state.list.push({
        id: action.payload.id,
        title: action.payload.title,
        watched: false,
        tags: [],
      })
    },
    filmToggled(state, action) {
      const film = state.list.find(film => film.id === action.payload)
      if (film) film.watched = !film.watched // TODO: convert to counter
    },
  },
})

export const { fetchFilms, filmsLoaded, filmAdded, filmToggled } =
  filmsSlice.actions
export default filmsSlice.reducer

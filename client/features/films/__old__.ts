import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import { filmType } from '../../../types/films'
import {
  getFilms,
  filmsLoaded,
  addFilm,
  filmAdded,
  removeFilm,
  filmRemoved,
  filmsError,
} from './__old__filmsSlice'
import { fetchAddFilm, fetchFilms, fetchRemoveFilm } from './__old__requests'

function* handleError(e: any) {
  let message
  if (e instanceof Error) message = e.message
  else message = String(e)
  yield put(filmsError(message))
}

/* sagas */
function* fetchFilmsSaga() {
  try {
    const films: filmType = yield call(fetchFilms)
    yield put(filmsLoaded(films))
  } catch (e) {
    handleError(e)
  }
}

function* addFilmSaga({ payload }: { type: string; payload: filmType }) {
  try {
    yield call(fetchAddFilm, payload)
    yield put(filmAdded(payload))
  } catch (e) {
    handleError(e)
  }
}

function* removeFilmSaga({ payload }: { type: string; payload: number }) {
  try {
    yield call(fetchRemoveFilm, payload)
    yield put(filmRemoved(payload))
  } catch (e) {
    handleError(e)
  }
}

export function* sagaWatcher() {
  yield takeLatest(getFilms.type, fetchFilmsSaga)
  yield takeEvery(addFilm.type, addFilmSaga)
  yield takeEvery(removeFilm.type, removeFilmSaga)
}

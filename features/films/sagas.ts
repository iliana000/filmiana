import { useQuery } from 'react-query'
import { call, put, takeLatest } from 'redux-saga/effects'

import { filmType } from '../../types/films'

async function fetchFilms() {
  console.log(1)

  const query = await fetch('http://localhost:3000/api/films')
    .then(res => res.json())
    .catch(e => console.log(e))

  // const query = useQuery('repoData', await() =>
  //   fetch('http://localhost:3000/api/films').then(res => res.json()),
  // )
  console.log(query)

  // const query = useQuery('films', async () => {
  //   console.log(2)

  //   const response = await fetch('http://localhost:3000/api/films')
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok')
  //   }
  //   return response.json()
  // })
  return query
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchFilmsSaga() {
  try {
    const films: filmType = yield call(fetchFilms)
    yield put({ type: 'films/fetchFilms/succeed', films })
  } catch (e) {
    let message
    if (e instanceof Error) message = e.message
    else message = String(e)
    yield put({ type: 'films/fetchFilms/error', message })
  }
}

export function* sagaWatcher() {
  yield takeLatest('films/fetchFilms', fetchFilmsSaga)
}

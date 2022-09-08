// import { useQuery } from 'react-query'

import { filmType } from '../../types/films'

export async function fetchFilms() {
  const query = await fetch('http://localhost:3000/api/films')
    .then(res => res.json())
    .catch(e => console.log(e))

  // TODO: try to use react-query
  // const query = useQuery('films', () =>
  //   fetch('http://localhost:3000/api/films')
  //     .then(res => res.json())
  //     .catch(e => console.log(e)),
  // )

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

export async function fetchAddFilm(film: filmType) {
  const encodedBody = new URLSearchParams(
    Object.entries(film) as string[][],
  ).toString()

  await fetch('http://localhost:3000/api/films', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: encodedBody,
  }).catch(e => console.log(e))
}

export async function fetchRemoveFilm(id: number) {
  await fetch(`http://localhost:3000/api/films/${id}`, {
    method: 'DELETE',
  }).catch(e => console.log(e))
}

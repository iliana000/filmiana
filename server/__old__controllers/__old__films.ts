import { Request, Response } from 'express'
import { filmType } from '../../types/films'

// moved to Mongo DB
export const tags: string[] = ['Tim', 'iliana', 'Family']
export let films: filmType[] = [
  {
    _id: '1',
    url: 'google.com',
    title: 'Anime',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDuSMK1VDMA_d_8lgRbsTSH0AXg1kLJ2gyym01uM7LA&s',
    tags: ['Tim'],
  },
  {
    _id: '2',
    url: 'google.com',
    title: '1+1',
    image:
      'https://www.humanmag.pl/wp-content/uploads/2021/02/coming-of-age-film.jpg',
    tags: ['Family'],
  },
  {
    _id: '3',
    url: 'google.com',
    title: 'Titanik',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDuSMK1VDMA_d_8lgRbsTSH0AXg1kLJ2gyym01uM7LA&s',
    tags: ['Tim', 'iliana'],
  },
]

export const getAll = (req: Request, res: Response) => {
  res.status(200).json(films)
}

export const create = (req: Request, res: Response) => {
  const newFilm = {
    _id: Date.now().toString(),
    ...req.body,
  }
  films.push(newFilm)
  res.status(201).json(films)
}

export const remove = (req: Request, res: Response) => {
  films = films.filter(f => f._id.toString() !== req.params._id)
  res.status(200).json({ message: 'Removed succesfully' })
}

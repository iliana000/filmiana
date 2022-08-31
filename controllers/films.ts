import { filmType } from '../types/films'
import {Request, Response} from 'express'


let films: filmType[] = [
        {
            id: 1,
            url: 'google.com',
            title: 'Anime',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDuSMK1VDMA_d_8lgRbsTSH0AXg1kLJ2gyym01uM7LA&s',
            tags: ['Tim']
        },
        {
            id: 2,
            url: 'google.com',
            title: '1+1',
            image: 'https://www.humanmag.pl/wp-content/uploads/2021/02/coming-of-age-film.jpg',
            tags: ['Family']
        },
        {
            id: 3,
            url: 'google.com',
            title: 'Titanik',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYDuSMK1VDMA_d_8lgRbsTSH0AXg1kLJ2gyym01uM7LA&s',
            tags: ['Tim', 'iliana']
        },
    ]

export const getAll = (req: Request, res: Response) => {
    res.status(200).json(films)
}

export const create = (req: Request, res: Response) => {
    const newFilm = {
        id: Date.now().toString(),
        ...req.body
    }
    films.push(newFilm)
    res.status(201).json(films)
}

export const remove = (req: Request, res: Response) => {
    films = films.filter(f => f.id.toString() !== req.params.id)
    res.status(200).json({message: 'Removed succesfully'})
}
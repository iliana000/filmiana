import { Router } from 'express'

import { getAll, create, remove } from '../controllers/films.js'

const router = Router()

router.get('/api/films', getAll)
router.post('/api/films', create)
router.delete('/api/films/:id', remove)

export default router

// old api without mongo and graphql
import { Router } from 'express'

import { getAll, create, remove } from '../__old__controllers/__old__films'

const router = Router()

router.get('/api/films', getAll)
router.post('/api/films', create)
router.delete('/api/films/:_id', remove)

export default router

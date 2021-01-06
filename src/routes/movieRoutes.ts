import { Router } from 'express'
import { body, param } from 'express-validator'
import movieController from '../controllers/movieController'
import validate from '../middleware/validate'

const movieRoutes = Router()

movieRoutes.post('/:id/like', param('id').isInt().toInt(), body('user').isInt().withMessage('User is required').toInt(), validate, movieController.likeMovie)
movieRoutes.post('/:id/dislike', param('id').isInt().toInt(), body('user').isInt().withMessage('User is required').toInt(), validate, movieController.dislikeMovie)

export default movieRoutes

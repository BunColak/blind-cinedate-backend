import { Router } from 'express'
import movieController from '../controllers/movieController'
import validate from '../middleware/validate'
import movieValidators from '../validators/movieValidators'

const movieRoutes = Router()

movieRoutes.post('/:id/like', ...movieValidators.likeMovieValidators, validate, movieController.likeMovie)
movieRoutes.post('/:id/dislike', ...movieValidators.dislikeMovieValidators, validate, movieController.dislikeMovie)

export default movieRoutes

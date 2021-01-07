import { body, param } from 'express-validator'

const movieValidators = {
  likeMovieValidators: [param('id').isInt().toInt(), body('userId').isInt().withMessage('User is required').toInt()],
  dislikeMovieValidators: [param('id').isInt().toInt(), body('userId').isInt().withMessage('User is required').toInt()]
}

export default movieValidators

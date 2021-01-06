import { Router } from 'express'
import userController from '../controllers/userController'
import { body, param } from 'express-validator'
import validate from '../middleware/validate'

const userRoutes = Router()

userRoutes.get('/:id', param('id').isInt().withMessage('Not a valid id'), validate, userController.getOne)
userRoutes.post('/', body('name').trim().notEmpty().withMessage('Name is required'), validate, userController.createUser)

export default userRoutes

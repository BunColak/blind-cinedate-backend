import { Router } from 'express'
import userController from '../controllers/userController'
import validate from '../middleware/validate'
import userValidators from '../validators/userValidators'

const userRoutes = Router()

userRoutes.get('/:id', ...userValidators.getUserValidators, validate, userController.getOne)
userRoutes.post('/', ...userValidators.createUserValidators, validate, userController.createUser)

export default userRoutes

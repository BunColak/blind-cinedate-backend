import { body, param } from 'express-validator'

const userValidators = {
  getUserValidators: [
    param('id').isInt().withMessage('Not a valid id')
  ],
  createUserValidators: [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').trim().notEmpty().withMessage('Password is required')
  ]
}

export default userValidators

import { PrismaClientValidationError, PrismaClientKnownRequestError } from '@prisma/client'
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prisma'
import errors from '../utils/errors'

const userController = {
  getOne: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const user = await prisma.user.findFirst({ where: { id } })
      if (!user) {
        return res.status(400).json(errors.userNotFound)
      }

      const { password, ...rest } = user
      return res.json(rest)
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res.status(400).json(errors.userNotFound)
      }
      return res.json(e.message)
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await prisma.user.create({ data: { username, password: hashedPassword }, select: { id: true, username: true } })
      return res.json(user)
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return res.status(400).json({
          errors: [
            {
              param: 'username',
              message: 'Username already exists'
            }
          ]
        })
      }

      return res.status(500).json(errors.dbError)
    }
  },
  loginUser: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body
      const user = await prisma.user.findFirst({ where: { username } })

      if (!user) {
        return res.status(400).json(errors.userNotFound)
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) {
        return res.status(400).json({
          errors: [
            {
              param: 'password',
              message: 'Wrong Password'
            }
          ]
        })
      } else {
        const { likedMovies, dislikedMovies, password, watchedMovies, ...tokenPayload } = user
        const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET || 'secret')
        return res.json({
          token,
          user: tokenPayload
        })
      }
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res.status(400).json(errors.userNotFound)
      }
      return res.json(e.message)
    }
  }
}

export default userController

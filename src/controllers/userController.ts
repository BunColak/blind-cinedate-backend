import { PrismaClientValidationError } from '@prisma/client'
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
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
      return res.status(500).json(errors.dbError)
    }
  }
}

export default userController

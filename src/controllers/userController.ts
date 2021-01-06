import { PrismaClientValidationError } from '@prisma/client'
import { Request, Response } from 'express'
import prisma from '../prisma'

const userController = {
  getOne: async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id)
      const user = await prisma.user.findFirst({ where: { id } })
      return res.json(user)
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res.status(400).json({
          errors: [
            {
              param: 'id',
              message: 'User cannot be found'
            }
          ]
        })
      }
      return res.json(e.message)
    }
  },
  createUser: async (req: Request, res: Response) => {
    try {
      const name = req.body.name
      const user = await prisma.user.create({ data: { name } })
      return res.json(user)
    } catch (error) {
      return res.status(500).json({
        error: 'Database Unavailable',
        message: 'Database Unavailable'
      })
    }
  }
}

export default userController

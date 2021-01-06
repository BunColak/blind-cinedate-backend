import { PrismaClientValidationError } from '@prisma/client'
import { Request, Response } from 'express'
import prisma from '../prisma'
import { userNotFound } from '../utils/errors'

const movieController = {
  likeMovie: async (req: Request, res: Response) => {
    try {
      const movieId = Number(req.params.id)
      const userId = Number(req.body.user)
      const user = await prisma.user.findFirst({ where: { id: userId } })

      if (!user) {
        return res.status(400).json(userNotFound)
      }

      const alreadyLiked = user.likedMovies.find(m => m === movieId)

      if (alreadyLiked) {
        return res.json({
          liked: true
        })
      }

      const newDisliked = user.dislikedMovies.filter(m => m !== movieId)
      const newLiked = [...user.likedMovies, movieId]
      await prisma.user.update({ data: { dislikedMovies: newDisliked, likedMovies: newLiked }, where: { id: userId } })
      return res.json({
        liked: true
      })
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res.status(400).json(userNotFound)
      }
      return res.json(e.message)
    }
  },
  dislikeMovie: async (req: Request, res: Response) => {
    try {
      const movieId = Number(req.params.id)
      const userId = Number(req.body.user)
      const user = await prisma.user.findFirst({ where: { id: userId } })
      const alreadyDisliked = user?.dislikedMovies.find(m => m === movieId)

      if (!user) {
        return res.status(400).json(userNotFound)
      }

      if (alreadyDisliked) {
        return res.json({
          disliked: true
        })
      }

      const newDisliked = [...user.dislikedMovies, movieId]
      const newLiked = user.likedMovies.filter(m => m !== movieId)
      await prisma.user.update({ data: { dislikedMovies: newDisliked, likedMovies: newLiked }, where: { id: userId } })
      return res.json({
        disliked: true
      })
    } catch (e) {
      if (e instanceof PrismaClientValidationError) {
        return res.status(400).json(userNotFound)
      }
      return res.json(e.message)
    }
  }
}

export default movieController

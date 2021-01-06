import express, { Request, Response } from 'express'

const app = express()

const PORT = process.env.PORT || 4000

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello there'
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

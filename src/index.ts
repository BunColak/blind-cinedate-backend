import dotenv from 'dotenv'
import express, { Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

app.use('/users', userRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello there'
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

import express from 'express'
import * as bodyParser from 'body-parser'
import dotenv from 'dotenv'
import movieRoutes from './routes/movieRoutes'
import userRoutes from './routes/userRoutes'

dotenv.config()

const app = express()
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

app.use('/users', userRoutes)
app.use('/movies', movieRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

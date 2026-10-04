import cors from 'cors'
import express from 'express'
import { healthRouter } from './routes/health.routes'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  }),
)
app.use(express.json())

app.use('/api/v1', healthRouter)

export default app

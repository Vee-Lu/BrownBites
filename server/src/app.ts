import cors from 'cors'
import express from 'express'
import { healthRouter } from './routes/health.routes'
import diningLocationRoutes from './routes/diningLocationRoutes'
import menuRoutes from './routes/menuRoutes'
import foodRoutes from './routes/foodRoutes'

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? 'http://localhost:5173',
  }),
)
app.use(express.json())
app.use('/api/v1', healthRouter)
app.use('/api/v1/dining-locations', diningLocationRoutes)
app.use('/api/v1/dining-locations', menuRoutes);
app.use('/api/v1/menus', foodRoutes);

export default app

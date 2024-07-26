import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { sequelize } from './db.js'
import userRouter from './routes/userRouter.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api', userRouter)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (error) {
    console.log(error)
  }
}

start()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import dotenv from 'dotenv'
dotenv.config()

const app = express()


import errorHandler from './middlewares/error-handler.js'

// import routers
import userRouter from './routers/user_router.js'
import boardRouter from './routers/board_router.js'
import groupRouter from './routers/group_router.js'


// ---- middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:5173', 'https://future-app-name-dom.com'],
  credentials:true,
  methods:'GET,POST,PUT,DELETE',
  allowedHeaders:['Content-Type','Authorization']
}))
app.use(helmet())


// ------ routers
app.use('/api',userRouter)
app.use('/api',boardRouter)
app.use('/api',groupRouter)

app.use(errorHandler)


export default app
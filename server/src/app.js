import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
const app = express()

// import routers
import userRouter from '../routers/user_router.js'


// ---- middlewares
app.use(express.json())
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true,
  methods:'GET,POST',
  allowedHeaders:['Content-Type','Authorization']
}))
app.use(helmet())

// ------ routers

app.use('/api',userRouter)


export default app
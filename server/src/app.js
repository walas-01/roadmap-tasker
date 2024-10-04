import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
const app = express()


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

app.get('/',(req,res)=>{res.status(200).send({message:'tobi'})})


export default app
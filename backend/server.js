import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import analyzeRoute from './routes/analyzeRoute.js'

dotenv.config()
const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/analyze" , analyzeRoute)

app.listen(process.env.Port || 500 , ()=> console.log("surver is runing"))
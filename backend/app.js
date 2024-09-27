import express from "express"
import messagesRouter from "./routes/messages.router.js"
import mongoose from "mongoose";
import cors from 'cors'
import { configs } from "./configs.js";
const app = express()
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.urlencoded({ extended: true }));
app.use('/api/messages', messagesRouter)
try {
    await mongoose.connect(configs.mongoUrl)
    console.log('conectado a la BDD')
} catch (error) {
    console.log(error.message)
}

app.listen(configs.port, ()=> console.log('connected'))

import express from "express"
import messagesRouter from "./routes/messages.router.js"
import contactsRouter from './routes/contacts.router.js'
import mongoose from "mongoose";
import cors from 'cors'
import { configs } from "./configs.js";
import { Server } from "socket.io";
import { client } from "./configs/client.js";
const app = express()
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.urlencoded({ extended: true }));
app.use('/api/messages', messagesRouter)
app.use('/api/contacts', contactsRouter)
try {
    await mongoose.connect(configs.mongoUrlTest)
    client.initialize()
} catch (error) {
    console.log(error.message)
}

const server = app.listen(configs.port, ()=> console.log('connected'))

export const socketServer = new Server(server, {
    cors: 'http://localhost:3000'
})
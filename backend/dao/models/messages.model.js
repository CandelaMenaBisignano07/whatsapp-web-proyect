import mongoose from "mongoose"

const messagesCollection = 'messages'

const messageSchema = new mongoose.Schema({
    description : String,
    created_at : String,
    state : {type: String, enum: ['pending', 'fulfilled', 'rejected']},
    recipient: String,
    send_at: Number
})

export const messagesModel = mongoose.model(messagesCollection, messageSchema);


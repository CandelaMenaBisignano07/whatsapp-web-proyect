import mongoose from "mongoose"

const messagesCollection = 'messages'

const messageSchema = new mongoose.Schema({
    description : String,
    uptaded_at: String,
    created_at : {type:String, required:true},
    recipient: {type:String, required:true},
    send_at: {type:Number, required:true},
    from: {type:String, required:true}
})

export const messagesModel = mongoose.model(messagesCollection, messageSchema);


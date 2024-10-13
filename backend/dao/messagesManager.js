import { messagesModel } from "./models/messages.model.js";

class MessagesManager{
    create = async(message)=>{
        const createdMessage = messagesModel.create(message)
        return createdMessage
    };
    getById = async(id)=>{
        const message = messagesModel.findById(id);
        return message
    };
    getAll = async()=>{
        const messages = messagesModel.find({});
        return messages;
    };
};

export default MessagesManager
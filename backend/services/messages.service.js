import MessagesRepository from "../repository/messages.repository.js";
import MessagesManager from "../dao/messagesManager.js";
import { __dirname} from "../utils/utils.js";
import { client } from "../configs/client.js"
const messagesDao = new MessagesManager()
const manager = new MessagesRepository(messagesDao)


//  client.on('message', async(client_message)=>{
//      if(client_message.from === "5491128632168@c.us"){
//          client_message.reply("valen te amo desde nodejs")
//      }
//      console.log(`Mensaje recibido de ${client_message.from}: ${client_message.body}`);
// })

//cuando el cliente active el modo "chatbot" se habilitara este evento


// Start your client

const sendPersonalMessageService = async(message)=>{
    let message_sended;
    let createdMessage;
    if(message.send_at === "now"){
        message_sended = await client.sendMessage(message.recipient, message.description)
        if(message_sended.id.fromMe){
            createdMessage = await manager.createMessageRepository(message)
            return createdMessage
        }else console.log('error desde now')
    }else{
        message_sended = await client.sendMessage(message.recipient, message.description)
        if (message_sended.id.fromMe) {
            createdMessage = await manager.createMessageRepository(message);
            return createdMessage
        } else {
            console.log('Scheduled message was not sent.');
        }
    }
};

const getAllMessagesService = async()=>{
    const messages = await manager.getAllRepository();
    return messages;
}; 

const uptadeMessageService=async(id, message)=>{
    const oldMessage = await manager.getByIdRepository(id);
    message={
        ...message,     
        created_at: oldMessage.created_at,
        recipient: oldMessage.recipient,
        send_at: oldMessage.send_at,
        from: oldMessage.from
    }
    const newMessage = await manager.updateRepository(id, message);
    return newMessage;
};

const deleteMessageService = async(id)=>{
    const message = await client.getMessageById(id)
    if(!message.fromMe) return message  
    await message.delete(true)
};

export{
    sendPersonalMessageService,
    getAllMessagesService,
    deleteMessageService,
    uptadeMessageService
}


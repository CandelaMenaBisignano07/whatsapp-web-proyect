import MessagesRepository from "../repository/messages.repository.js";
import MessagesManager from "../dao/messagesManager.js";
import pkg from "whatsapp-web.js";
const {Client, LocalAuth} = pkg;
import QRcode from 'qrcode-terminal'
import { idGenerator, mediaCharge, __dirname } from "../utils/utils.js";
import fs from 'fs/promises'
const messagesDao = new MessagesManager()
const manager = new MessagesRepository(messagesDao)

const client = new Client({
    puppeteer: { headless: false, timeout:60000 },
    debug: true,
    authStrategy: new LocalAuth({
        dataPath: './backend/authFolder',
        clientId: 'client-one',
    })
});

client.once('ready', () => {
    console.log('Client is ready!');
});

// When the client received QR-Code
client.on('qr', (qr) => {
    QRcode.generate(qr, {small:true})
});

client.on('disconnected', (reason)=>{
    console.log(reason + "jeee")
})

//  client.on('message', async(client_message)=>{
//      if(client_message.from === "5491128632168@c.us"){
//          client_message.reply("valen te amo desde nodejs")
//      }
//      console.log(`Mensaje recibido de ${client_message.from}: ${client_message.body}`);
// })

//cuando el cliente active el modo "chatbot" se habilitara este evento


// Start your client
client.initialize();

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
        setTimeout(async()=>{
            message_sended = await client.sendMessage(message.recipient, message.description)
            if (message_sended.id.fromMe) {
                createdMessage = await manager.createMessageRepository(message);
                return createdMessage
                } else {
                    console.log('Scheduled message was not sent.');
                }
        }, message.send_at*1000)
    }
};

const getAllMessagesService = async()=>{
    const messages = await manager.getAllRepository();
    return messages
};

const getAllContactsService = async()=>{  ////esto iria en users cuando tenga la autenticacion
    const contacts = await client.getChats();
    return contacts;
};
const getOneContactService = async(id)=>{  ////esto iria en users cuando tenga la autenticacion
    await fs.rm(`${__dirname}../../../frontend/public/media`, {recursive:true, force:true})
    await fs.mkdir(`${__dirname}../../../frontend/public/media`)
    const contact = await client.getChatById(id)
    const contactNew = {isGroup: contact.isGroup, id: contact.id, name:contact.name}
    const messages = await contact.fetchMessages({limit:5})
    for(const message of messages){ //recorre los msjs obtenidos
        if(message.hasMedia){ //si el msj tiene media
            if(message.type === 'video') console.log(message)
            message.pathToMedia = await mediaCharge(message)
        }
    }
    return {...contactNew, messages:messages.map((msg)=>{
        if(msg.pathToMedia) return {pathToMedia: msg.pathToMedia, id:msg.id, hasMedia:msg.hasMedia, body:msg.body, type:msg.type}
        else return {pathToMedia: msg.pathToMedia, id:msg.id, hasMedia:msg.hasMedia, body:msg.body, type:msg.type}
    })};
};

const getProfilePictureService = async(id)=>{
    const profilePicture = await client.getProfilePicUrl(id);
    return profilePicture
};

export{
    sendPersonalMessageService,
    getAllMessagesService,
    getAllContactsService,
    getProfilePictureService,
    getOneContactService

}


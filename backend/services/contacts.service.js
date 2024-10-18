import {mediaCharge, __dirname} from "../utils/utils.js";
import fs from 'fs/promises'
import { client } from "../configs/client.js"
const getAllContactsService = async()=>{  ////esto iria en users cuando tenga la autenticacion
    const contacts = await client.getChats()
    return contacts
};
const getOneContactService = async(id)=>{  ////esto iria en users cuando tenga la autenticacion
    await fs.rm(`${__dirname}../../../frontend/public/media`, {recursive:true, force:true})
    await fs.mkdir(`${__dirname}../../../frontend/public/media`)
    const contact = await client.getChatById(id)
    const contactNew = {isGroup: contact.isGroup, id: contact.id, name:contact.name}
    const messages = await contact.fetchMessages({limit:5})
    for(let message of messages){ 
        const contactProfile = await message.getContact()
        message.profilePicture =  await getProfilePictureService(contactProfile.id._serialized)
        if(message.hasMedia){ //si el msj tiene media
            message.pathToMedia = await mediaCharge(message)
        }
    }
    return {...contactNew, messages:messages.map((msg)=>{
        if(msg.pathToMedia) return {pathToMedia: msg.pathToMedia, id:msg.id, hasMedia:msg.hasMedia, body:msg.body, type:msg.type, created_at: msg.timestamp, author:msg.name, profilePicture: msg.profilePicture ? msg.profilePicture : './img/whatsapp_default_image.jpeg'}
        else return {pathToMedia: msg.pathToMedia, id:msg.id, hasMedia:msg.hasMedia, body:msg.body, type:msg.type,created_at: msg.timestamp, author: msg.name,  profilePicture: msg.profilePicture ? msg.profilePicture : './img/whatsapp_default_image.jpeg'}
    })};
};

const getProfilePictureService = async(id)=>{
    const profilePicture = await client.getProfilePicUrl(id);
    return profilePicture
};

const destroyClientService = async()=>{
    await client.destroy();
}

export{
    getProfilePictureService,
    getOneContactService,
    getAllContactsService,
    destroyClientService
}
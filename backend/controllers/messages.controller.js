import { sendPersonalMessageService, getAllMessagesService, getAllContactsService, getOneContactService, getProfilePictureService} from "../services/messages.service.js";

const sendPersonalMessages = async(req,res)=>{
    const {recipient, description,send_at} = req.body
    try {
        if(!description|| !recipient || !send_at){
            return res.status(400).send({status:'error', error: 'a campus was forgotten'})
        };
        const message = {
            description,
            recipient,
            send_at,
            created_at: new Date().toLocaleString(),
            status: "pending"
        }
        const replied = await sendPersonalMessageService(message);
        return res.status(201).send({message:"the message was sended successfully", payload:replied})
    } catch (error) {
        console.log(error.message)
        res.status(500).send({status:"error", error:error.message})
    }
};

const getAllMessages = async(req,res)=>{
    try {
        const messages = await getAllMessagesService()
        return res.send({message:"the messages were obtained successfully", payload:messages})
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
};

const getAllContacts = async(req,res)=>{
    try {
        const contacts = await getAllContactsService()
        return res.send({message:"the contacts were obtained successfully", payload:contacts})
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
};

const getOneContact = async(req,res)=>{
    const {id} = req.params
    try {
        const contact = await getOneContactService(id)
        return res.send({message:"the contact was obtained successfully", payload:contact})
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
}

const getProfilePicture = async(req,res)=>{
    const {id} = req.params
    try {
        const profilePicture = await getProfilePictureService(id);
        return res.send({message:'the profile picture was obtained successfully', payload: profilePicture})
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
}

export {sendPersonalMessages, getAllMessages, getAllContacts, getOneContact, getProfilePicture}
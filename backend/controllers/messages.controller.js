import { sendPersonalMessageService, getAllMessagesService, deleteMessageService, uptadeMessageService} from "../services/messages.service.js";
import { client } from "../configs/client.js";
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
            status: "pending",
            from: client.info.wid._serialized
        }
        const replied = await sendPersonalMessageService(message);
        console.log(replied)
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

const deleteMessage = async(req,res)=>{
    const id = req.params.id
    try {
        await deleteMessageService(id)
        return res.send({status:'success', message:'the message was deleted successfully'})
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
};

const uptadeMessage = async(req,res)=>{
    const id = req.params.id;
    const {description} = req.body;
    try {
        if(!description) return res.status(400).send({status:'error', error: 'a campus was forgotten'});
        const uptadedMessage = {description};
        const newMessage = await uptadeMessageService(id, uptadedMessage);
        return res.send({status:'success', payload:newMessage});
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
};

export {sendPersonalMessages, getAllMessages, deleteMessage, uptadeMessage}
import { client } from "../configs/client.js";
import {destroyClientService, getAllContactsService, getOneContactService, getProfilePictureService } from "../services/contacts.service.js"

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
        const contact = await getOneContactService(id);
        if(contact.id.server == 'c.us'){
            const isRegistered = await client.isRegisteredUser(id);
            if(!isRegistered) return res.status(404).send({status:'error', error:'the contact doesnt exists'})
        };
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
};

const destroyClient = async(req,res)=>{
    try {
        await destroyClientService();
        return res.send({status:'success', message:'client was destroyed succesfully'});
    } catch (error) {
        return res.status(500).send({status:'error', error:error.message})
    }
}

export{
    getAllContacts,
    getOneContact,
    getProfilePicture,
    destroyClient
}
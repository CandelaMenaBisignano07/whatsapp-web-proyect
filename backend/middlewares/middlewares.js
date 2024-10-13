import { client } from "../configs/client.js"

export const handleClient = (req,res,next)=>{
    if(client.info) next();
    else return res.status(400).send({status:'error', error: 'the client isnt avaiable yet'})
}


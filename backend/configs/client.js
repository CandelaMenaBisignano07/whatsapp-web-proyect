import { socketServer } from "../app.js";
import { __dirname, qrCharge} from "../utils/utils.js";
import pkg from 'whatsapp-web.js'
const { Client, LocalAuth} = pkg;

export const client = new Client({
    puppeteer: { headless: false, timeout:0 },
    debug: true,
    authStrategy: new LocalAuth({
        dataPath: './authFolder',
        clientId: 'client-one',
    })
});

client.on('ready', () => {
    console.log('Client is ready!');
    socketServer.emit('clientReady', client.info)
});
client.on('auth_failure', ()=>{
    client.emit('authFailure')
})
// When the client received QR-Code
client.on('qr', async(qr) => {
    console.log('qr')
    const qrUrl = await qrCharge(qr)
    socketServer.emit('qr', qrUrl)
});

client.on('disconnected', (reason)=>{
    console.log(reason + "jeee")
    localStorage.removeItem('client')
    client.emit('loggedOut')
})

client.on('message', (client_message)=>{
    socketServer.emit('messageRecieved', client_message)
})

client.on('message_create', (client_message)=>{
    socketServer.emit('messageSended', client_message)
})

client.on('message_revoke_everyone', (afterMessage, revokedMessage)=>{
    socketServer.emit('revokedMessage', revokedMessage)
})
//cuando el cliente active el modo "chatbot" se habilitara este evento

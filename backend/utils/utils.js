import { v4 } from "uuid";
import fs from 'fs/promises';
import path from "path";
import { fileURLToPath } from "url";

export const idGenerator = ()=>{
    const id = v4();
    return id;
};

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const mediaCharge=async(message)=>{                                   
    const media = await message.downloadMedia(); //obtiene la media del msj
    const mediaType = media.mimetype.split('/'); //separa el tipo de archivo
    const data = Buffer.from(media.data, 'base64')
    const id = idGenerator()
    await fs.writeFile(`${__dirname}../../../frontend/public/media/${id}.${mediaType[1].split(';')[0]}`, data) //escribe un archivo en la carpeta indicada con la media
    return `/media/${id}.${mediaType[1].split(';')[0]}`
}

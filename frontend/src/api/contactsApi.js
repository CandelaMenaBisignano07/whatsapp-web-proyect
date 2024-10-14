
const URL = 'http://localhost:8080/api/contacts';
export const fetchContact = async(signal,contactId, setContact)=>{
    try {
        console.log('hola estoy llamando 2 veces')
        const contactFetch = await fetch(`${URL}/${contactId}`, {
            method:'GET', 
            headers:{
                'Content-Type': 'application/json'
            },
            signal: signal
        });
        const {payload: contactFetched} = await contactFetch.json()
        console.log(contactFetched)
        const profilePictureFetch = await fetch(`${URL}/profile-picture/${contactFetched.id._serialized}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            signal:signal
        })
        const {payload: profilePicture} = await profilePictureFetch.json()
        return profilePicture === undefined ? setContact({...contactFetched, profile_picture:'./img/whatsapp_default_image.jpeg'}) : setContact({...contactFetched, profile_picture: profilePicture}) 
    } catch (error) {
        console.log(error.message)
    }
}
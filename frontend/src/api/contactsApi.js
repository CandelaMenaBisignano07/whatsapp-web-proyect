const URL = 'http://localhost:8080/api/contacts';
export const fetchContact = async(signal,contactId, setContact, callback, setError)=>{
    
    try {
        console.log('hola estoy llamando 2 veces')
        const contactFetch = await fetch(`${URL}/${contactId}`, {
            method:'GET', 
            headers:{
                'Content-Type': 'application/json'
            },
            signal: signal
        });
        if(contactFetch.status != 200 ) {
            const {error: errorMessage} = await contactFetch.json()
            setError({code:contactFetch.status, message: errorMessage})
            return callback(`/error/${contactFetch.status}`)
        }
        const {payload: contactFetched} = await contactFetch.json()
        console.log(contactFetched)
        const profilePictureFetch = await fetch(`${URL}/profile-picture/${contactFetched.id._serialized}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
            signal:signal
        })

        if(profilePictureFetch.status != 200 ) {
            const {error: errorMessage} = await profilePictureFetch.json()
            setError({code:profilePictureFetch.status, message: errorMessage})
            return callback(`/error/${profilePictureFetch.status}`)
        }
        const {payload: profilePicture} = await profilePictureFetch.json()
        return profilePicture === undefined ? setContact({...contactFetched, profile_picture:'./img/whatsapp_default_image.jpeg'}) : setContact({...contactFetched, profile_picture: profilePicture}) 
    } catch (error) {
        if(error.message === 'signal is aborted without reason'){
            return
        }  
        else console.log(error.message)
    }
}

//faltan las otras peticiones
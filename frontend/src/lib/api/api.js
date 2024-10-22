const URL = 'http://localhost:8080/api/';
export const api = {
    contacts:{
        fetchContact: async(signal,contactId, setContact, callback, setError)=>{
            try {
                console.log('hola estoy llamando 2 veces')
                const contactFetch = await fetch(`${URL}contacts/${contactId}`, {
                    method:'GET', 
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    signal: signal
                });
                if(contactFetch.status !== 200 ) {
                    const {error: errorMessage} = await contactFetch.json()
                    setError({code:contactFetch.status, message: errorMessage})
                    return callback(`/error/${contactFetch.status}`)
                }
                const {payload: contactFetched} = await contactFetch.json()
                const profilePictureFetch = await fetch(`${URL}contacts/profile-picture/${contactFetched.id._serialized}`,{
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    signal:signal
                })
        
                if(profilePictureFetch.status !== 200 ) {
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
        },
        fetchContacts : async(setError, navigate, signal, setContacts, setContactsUptade)=>{
            console.log('jaa')
            try {
                const contactsFetch = await fetch(`${URL}contacts`, {
                    method:'GET',
                    headers:{
                        'Content-Type': "application/json"
                    },
                    signal:signal
                })
                console.log(contactsFetch.status)
                if(contactsFetch.status !== 200){
                    const {error: errorMessage} = await contactsFetch.json();
                    setError({code: contactsFetch.status, message: errorMessage})
                    return navigate(`/error/${contactsFetch.status}`)
                }
                const {payload:payload2} = await contactsFetch.json();
                console.log(payload2, 'hola')
                const mappedContacts = payload2.map((c)=> {return{id:c.id, name:c.name}})
                setContacts(mappedContacts);
                setContactsUptade(mappedContacts);
                console.log('setted')
            } catch (error) {
                console.log(error.message)
            }
        },
        destroyClient : async(setError, navigate, client)=>{
            try {
                const clientDestroy = await fetch(`${URL}contacts`, {
                    method:'delete',
                    headers:{
                        'Content-type': 'application/json'
                    }
                })
    
                if(clientDestroy.status !== 200){
                    const {error: errorMessage} = await clientDestroy.json();
                    setError({code: clientDestroy.status, message: errorMessage})
                    return navigate(`/error/${clientDestroy.status}`)
                }
                localStorage.setItem('client', "")
                client.emit('clientDestroyed', 'client destroyed')
                return navigate('/loggedOut')
            } catch (error) {
                if(error.message === 'signal is aborted without reason'){
                    return
                }  
                else console.log(error.message)
            }
        }
    },
    messages:{
        fetchMessages : async(client, setData)=>{
            try {
                const messages = await fetch(`${URL}messages`, {
                    method:'GET',
                    headers:{
                        'Content-Type': "application/json"
                    }
                });
    
                const {payload} = await messages.json();
                setData(payload.filter(m => m.from === client.me._serialized))
            } catch (error) {
                if(error.message === 'signal is aborted without reason'){
                    return
                }  
                else console.log(error.message)
            }
        },
        deleteMessage : async(id, navigate, setError)=>{
            try {
                const hola = await fetch(`${URL}messages/${id}`,{
                    method:'DELETE', 
                    headers:{
                        'Content-Type': 'application/json'
                    }
                })
    
                if(hola.status !== 200){
                    const {error: errorMessage} = await hola.json()
                    setError({code:hola.status, message: errorMessage})
                    return navigate(`/error/${hola.status}`)
                }
            } catch (error) {
                if(error.message === 'signal is aborted without reason'){
                    return
                }  
                else console.log(error.message)
            }
        },
        postMessage : async(inputData, data, setData)=>{
            const postedMessage = await fetch(`${URL}messages`, {
                method:'POST',
                body: JSON.stringify({
                    description: inputData.message,
                    send_at: inputData.seconds,
                    recipient: inputData.number
                }),
                headers:{
                    'Content-Type': "application/json"
                }
            });
            const json = await postedMessage.json()
            setData([...data, json.payload])
        }
    }
}
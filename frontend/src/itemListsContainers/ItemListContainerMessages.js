import { useEffect, useState, useContext} from "react"
import SideBar from '../components/SideBar'
import { ClientContext } from "../context/ClientContext"
import InputMessages from "../components/InputMessages"
import Button from '../components/Button'
import ItemListMessages from "../itemLists/ItemListMessages"
const MessagesPage = () => {
    const [data, setData] = useState([])
    const [inputData, setInputData] = useState({})
    const [isLoading, setIsLoading] = useState(true) // estado loader fetch general
    const {URL, client, localStorageIsLoading, setLocalStorageIsLoading, setError} = useContext(ClientContext) // estado loader de mensajes con delay
    const inputChange = (name, data)=>{
        const newOne = structuredClone(inputData)
        newOne[name] = data;
        setInputData(newOne)
    }
    const fetchMessages = async()=>{
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
    }
    useEffect(()=>{
        console.log(localStorageIsLoading, 'desde el useeffect')
        if(!localStorageIsLoading){
            fetchMessages()
            setIsLoading(false)
        }
    }, [localStorageIsLoading])

    const changeState=async()=>{
        if (inputData.message && inputData.seconds && inputData.number){
            localStorage.setItem('loadingMessage', JSON.stringify(true))
            setLocalStorageIsLoading(JSON.parse(localStorage.getItem('loadingMessage')))
            const timer = setTimeout(async()=>{
                try{
                    const promise = await fetch(`${URL}messages`, {
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
                    const json = await promise.json()
                    setData([...data, json.payload])
                    setIsLoading(false)
                    localStorage.setItem('loadingMessage',  JSON.stringify(false))
                    setLocalStorageIsLoading(JSON.parse(localStorage.getItem('loadingMessage')))
                }catch(error){
                    setError({code: error.response.status, message: error.message})
                }
            }, (inputData.seconds)*1000)

            return ()=>{
                clearTimeout(timer)
            }
        }else{
            console.log('jajaj malll')
        }
    }
    return (
    <div className="containerGrid">
        <SideBar/>
        <section className="mainContent">
            <h1>CHATBOT WHATSAPP</h1>
            <InputMessages callback={inputChange} inputData={inputData}/>
            <Button callback={changeState} body={'enviar'}/>
            <h2>ultimos mensajes enviados:</h2>
            <ItemListMessages data={data} setIsLoadingMessages={setLocalStorageIsLoading} isLoadingMessages={localStorageIsLoading} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </section>
    </div>
    )
}

//hay que arreglar que, si un mensaje esta cargando y yo me voy de la pagina cuando vuelva siga cargando

export default MessagesPage

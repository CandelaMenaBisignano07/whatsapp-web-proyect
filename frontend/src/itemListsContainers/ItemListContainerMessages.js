import { useEffect, useState, useContext} from "react"
import SideBar from '../components/SideBar'
import { ClientContext } from "../context/ClientContext"
import InputMessages from "../components/InputMessages"
import Button from '../components/Button'
import ItemListMessages from "../itemLists/ItemListMessages"
import { api } from "../lib/api/api"
import { verifyNumber } from '../utils/utils'
const MessagesPage = () => {
    const [data, setData] = useState([])
    const [inputData, setInputData] = useState({})
    const [isLoading, setIsLoading] = useState(true) // estado loader fetch general
    const {client, localStorageIsLoading, setLocalStorageIsLoading, setError} = useContext(ClientContext) // estado loader de mensajes con delay
    const inputChange = (name, data)=>{
        const newOne = structuredClone(inputData)
        newOne[name] = data;
        setInputData(newOne)
    }
    useEffect(()=>{
        console.log(localStorageIsLoading, 'desde el useeffect')
        if(!localStorageIsLoading){
            api.messages.fetchMessages(client, setData)
            setIsLoading(false)
        }
    }, [localStorageIsLoading])

    const changeState=async()=>{ 
        if (inputData.message && inputData.seconds && inputData.number){ 
            if(!verifyNumber(inputData.number)) return alert('invalid number, please write a valid number')
            localStorage.setItem('loadingMessage', JSON.stringify(true))
            setLocalStorageIsLoading(JSON.parse(localStorage.getItem('loadingMessage')))
            const timer = setTimeout(async()=>{
                try{
                    await api.messages.postMessage(inputData, data, setData)
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
            <Button callback={changeState} params={[]} body={'enviar'}/>
            <h2>ultimos mensajes enviados:</h2>
            <ItemListMessages data={data} setIsLoadingMessages={setLocalStorageIsLoading} isLoadingMessages={localStorageIsLoading} isLoading={isLoading} setIsLoading={setIsLoading}/>
        </section>
    </div>
    )
}


export default MessagesPage

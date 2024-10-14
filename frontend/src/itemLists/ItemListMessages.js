import ItemMessage from '../Items/ItemMessage'
import Loader from '../components/Loader'
const ItemListMessages = ({data, isLoadingMessages, isLoading}) => {
    console.log(isLoadingMessages, 'desde itemlist')
    if(isLoadingMessages || isLoading) return <Loader/>
    return (
    <>
        <ul className="containerMessages">
            {
                data.length > 0 ?
                data.map(r=><ItemMessage key={r._id} description={r.description} created_at={r.created_at} recipient={r.recipient} />)
                : <p>no hay mensajes disponibles de este usuario</p>
            }
        </ul>
    </>
    )
}

export default ItemListMessages

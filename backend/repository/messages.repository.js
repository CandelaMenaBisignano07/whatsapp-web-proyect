class MessagesRepository{
    constructor(dao){
        this.dao = dao
    }

    createMessageRepository = async(message)=>{
        const createdMessage = await this.dao.create(message)
        return createdMessage
    };

    getByIdRepository = async(id)=>{
        const message = await this.dao.getById(id)
        return message
    };
    getAllRepository = async()=>{
        const messages = await this.dao.getAll()
        return messages
    }
}

export default MessagesRepository
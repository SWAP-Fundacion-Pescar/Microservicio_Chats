import IChatDocument from "../Interfaces/IChatModelDocument";
import IChatQuery from "../Interfaces/IChatQuery";
import ChatModel from "../Persistence/Models/ChatModel";

class ChatQuery implements IChatQuery
{
    async getChatByUserId(userId: string): Promise<Array<IChatDocument>> {
        const retrievedChats : Array<IChatDocument> = await ChatModel.find({$or: [{senderUserId: userId}, {receiverUserId: userId}]})
        if(!retrievedChats) throw Error('No se encontraron chats');
        return retrievedChats;
    }    
}
export default ChatQuery;
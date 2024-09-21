import NotFoundException from "../../Application/Exceptions/NotFoundException";
import IChatDocument from "../Interfaces/IChatModelDocument";
import IChatQuery from "../Interfaces/IChatQuery";
import ChatModel from "../Persistence/Models/ChatModel";

class ChatQuery implements IChatQuery {
    async getChatByUserId(userId: string): Promise<Array<IChatDocument>> {
        const retrievedChats: Array<IChatDocument> = await ChatModel.aggregate([
            {
                $match: {
                    $or: [
                        { senderUserId: userId },
                        { receiverUserId: userId }
                    ]
                }
            },
            {
                $addFields: {
                    lastMessage: { $arrayElemAt: ["$messages", -1] } // Get the last message in the array
                }
            },
            {
                $sort: {
                    "lastMessage.createdAt": -1 // Sort by the createdAt of the last message
                }
            }
        ]).exec();
        if (!retrievedChats) throw new NotFoundException('No se encontro el chat');
        return retrievedChats;
    }
}
export default ChatQuery;
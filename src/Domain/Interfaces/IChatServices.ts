import IncomingMessageDTO from "../../Application/DTO/IncomingMessageDTO";
import CreateChatRequest from "../../Application/Requests/CreateChatRequest";
import Chat from "../Entities/Chat";
import Message from "../Entities/Message";

interface IChatServices
{
    createChat(createChatRequest: CreateChatRequest): Promise<Chat>;
    sendMessage(incomingMessageDTO: IncomingMessageDTO): Promise<Message>;
    deleteChat(chatId: string): Promise<void>;
    getChatByUserId(userId: string): Promise<Array<Chat>>
    readMessage(messageId: string, chatId:string): Promise<void>;
}
export default IChatServices;
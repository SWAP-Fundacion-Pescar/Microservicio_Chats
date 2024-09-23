import IncomingMessageDTO from "../../Application/DTO/IncomingMessageDTO.js";
import CreateChatRequest from "../../Application/Requests/CreateChatRequest.js";
import UpdateConfirmationStateRequest from "../../Application/Requests/UpdateConfirmationStateRequest.js";
import Chat from "../Entities/Chat.js";
import Message from "../Entities/Message.js";

interface IChatServices
{
    createChat(createChatRequest: CreateChatRequest): Promise<Chat>;
    sendMessage(incomingMessageDTO: IncomingMessageDTO): Promise<Message>;
    deleteChat(chatId: string): Promise<void>;
    getChatByUserId(userId: string): Promise<Array<Chat>>
    readMessage(messageId: string, chatId:string): Promise<void>;
    updateConfirmationState(updateConfirmationStateRequest: UpdateConfirmationStateRequest): Promise<Chat>
}
export default IChatServices;
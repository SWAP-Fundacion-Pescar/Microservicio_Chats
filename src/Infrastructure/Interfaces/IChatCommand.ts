import CreateChatRequest from "../../Application/Requests/CreateChatRequest.js";
import NewMessageDTO from "../../Domain/DTO/NewMessageDTO.js";
import Message from "../../Domain/Entities/Message.js";
import IChatDocument from "./IChatModelDocument.js";

interface IChatCommand
{
    createChat(createChatRequest: CreateChatRequest): Promise<IChatDocument>;
    sendMessage(newMessageDTO: NewMessageDTO): Promise<Message>;
    deleteChat(chatId: string): Promise<void>;
    readMessage(messageId: string, chatId:string):Promise<void>;
}
export default IChatCommand;
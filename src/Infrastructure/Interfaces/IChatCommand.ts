import CreateChatRequest from "../../Application/Requests/CreateChatRequest";
import NewMessageDTO from "../../Domain/DTO/NewMessageDTO";
import Message from "../../Domain/Entities/Message";
import IChatDocument from "./IChatModelDocument";

interface IChatCommand
{
    createChat(createChatRequest: CreateChatRequest): Promise<IChatDocument>;
    sendMessage(newMessageDTO: NewMessageDTO): Promise<Message>;
    deleteChat(chatId: string): Promise<void>;
    readMessage(indexMessage:number, chatId:string):Promise<void>;
}
export default IChatCommand;
import NotFoundException from "../../Application/Exceptions/NotFoundException";
import CreateChatRequest from "../../Application/Requests/CreateChatRequest";
import NewMessageDTO from "../../Domain/DTO/NewMessageDTO";
import Message from "../../Domain/Entities/Message";
import IChatCommand from "../Interfaces/IChatCommand";
import IChatDocument from "../Interfaces/IChatModelDocument";
import ChatModel from "../Persistence/Models/ChatModel";

class ChatCommand implements IChatCommand
{
    async createChat(createChatRequest: CreateChatRequest): Promise<IChatDocument> {
        const createdChat: IChatDocument = await new ChatModel(createChatRequest);
        return createdChat;
    }
    async sendMessage(newMessageDTO: NewMessageDTO): Promise<Message> {
        const retrievedChat: IChatDocument | null = await ChatModel.findById(newMessageDTO.chatId);
        if(!retrievedChat) throw new NotFoundException('No se encontro el chat');
        retrievedChat.messages.push(newMessageDTO.message);
        await retrievedChat.save();
        const retrievedMessage: Message = retrievedChat.messages[retrievedChat.messages.length - 1] 
        return retrievedMessage;
    }
    async deleteChat(chatId: string): Promise<void> {
        const retrievedChat: IChatDocument | null = await ChatModel.findByIdAndDelete(chatId);
        if(!retrievedChat) throw new NotFoundException('No se encontro el chat');        
    }    
}
export default ChatCommand;
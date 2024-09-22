import NotFoundException from "../../Application/Exceptions/NotFoundException.js";
import CreateChatRequest from "../../Application/Requests/CreateChatRequest.js";
import NewMessageDTO from "../../Domain/DTO/NewMessageDTO.js";
import Message from "../../Domain/Entities/Message.js";
import IChatCommand from "../Interfaces/IChatCommand.js";
import IChatDocument from "../Interfaces/IChatModelDocument.js";
import IMessageDocument from "../Interfaces/IMessageDocument.js";
import ChatModel from "../Persistence/Models/ChatModel.js";
import { MessageModel } from "../Persistence/Models/MessageModel.js";

class ChatCommand implements IChatCommand
{
    async createChat(createChatRequest: CreateChatRequest): Promise<IChatDocument> {
        const createdChat: IChatDocument = await new ChatModel(createChatRequest);
        await createdChat.save();
        return createdChat;
    }
    async sendMessage(newMessageDTO: NewMessageDTO): Promise<Message> {
        const retrievedChat: IChatDocument | null = await ChatModel.findById(newMessageDTO.chatId);
        if(!retrievedChat) throw new NotFoundException('No se encontro el chat');
        const createdMessage = new MessageModel(newMessageDTO.message);
        retrievedChat.messages.push(createdMessage);
        await retrievedChat.save();
        return createdMessage;
    }
    async deleteChat(chatId: string): Promise<void> {
        const retrievedChat: IChatDocument | null = await ChatModel.findByIdAndDelete(chatId);
        if(!retrievedChat) throw new NotFoundException('No se encontro el chat');        
    }    
    async readMessage(messageId: string, chatId:string):Promise<void>{
        const retrievedChat: IChatDocument | null = await ChatModel.findById(chatId);
        if(!retrievedChat)throw new NotFoundException('No se encontro el chat');  
        const message: IMessageDocument | null = retrievedChat.messages.id(messageId);
        if(!message) throw new NotFoundException('No se encontro el mensaje');
        message.isRead = true;
        await retrievedChat.save();
    }
}
export default ChatCommand;
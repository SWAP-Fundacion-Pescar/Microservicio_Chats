import IncomingMessageDTO from "../../Application/DTO/IncomingMessageDTO";
import CreateChatRequest from "../../Application/Requests/CreateChatRequest";
import IChatCommand from "../../Infrastructure/Interfaces/IChatCommand";
import IChatQuery from "../../Infrastructure/Interfaces/IChatQuery";
import NewMessageDTO from "../DTO/NewMessageDTO";
import Chat from "../Entities/Chat";
import Message from "../Entities/Message";
import IChatServices from "../Interfaces/IChatServices";

class ChatServices implements IChatServices
{
    private chatCommand: IChatCommand;
    private chatQuery: IChatQuery;
    constructor(chatCommand: IChatCommand, chatQuery: IChatQuery)
    {
        this.chatCommand = chatCommand;
        this.chatQuery = chatQuery;
    }
    async createChat(createChatRequest: CreateChatRequest): Promise<Chat> {
        const createdChat : Chat = await this.chatCommand.createChat(createChatRequest);
        return createdChat;
    }
    async sendMessage(incomingMessageDTO: IncomingMessageDTO): Promise<Message> {
        console.log(incomingMessageDTO);
        const message: Message = new Message(incomingMessageDTO.userId, incomingMessageDTO.content)
        const newMessage: NewMessageDTO = new NewMessageDTO(incomingMessageDTO.chatId, message);
        const retrievedMessage: Message = await this.chatCommand.sendMessage(newMessage);
        return retrievedMessage;
    }
    async deleteChat(chatId: string): Promise<void> {
        await this.chatCommand.deleteChat(chatId);
    }
    async getChatByUserId(userId: string): Promise<Array<Chat>> {
        const retrievedChats: Array<Chat> = await this.chatQuery.getChatByUserId(userId);
        return retrievedChats;
    }    
}
export default ChatServices;

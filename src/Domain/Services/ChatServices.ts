import IncomingMessageDTO from "../../Application/DTO/IncomingMessageDTO";
import CreateChatRequest from "../../Application/Requests/CreateChatRequest";
import IChatCommand from "../../Infrastructure/Interfaces/IChatCommand";
import IChatQuery from "../../Infrastructure/Interfaces/IChatQuery";
import NewMessageDTO from "../DTO/NewMessageDTO";
import Chat from "../Entities/Chat";
import Message from "../Entities/Message";
import IChatServices from "../Interfaces/IChatServices";
import fs from 'fs';
import { writeFile } from 'fs/promises';
import path from 'path';
import Media from "../Entities/Media";

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
        const message: Message = new Message(incomingMessageDTO.userId, incomingMessageDTO.content)
        if(incomingMessageDTO.media)
            {
                const generatedName = `${Date.now()}` + `${incomingMessageDTO.chatId}` + '.jpg';
                const baseDirectory = path.join(__dirname, `../../../../FrontEnd/public/chats/${incomingMessageDTO.chatId}`)
                if(!fs.existsSync(baseDirectory))
                    {
                        fs.mkdirSync(baseDirectory);
                    }                
                let directory = path.join(baseDirectory, generatedName);
                await writeFile(directory, incomingMessageDTO.media);
                const url = `http://localhost:3000/chats/${incomingMessageDTO.chatId}/${generatedName}`;
                const messageMedia: Media = new Media(url, 'image');
                message.media = messageMedia;
            }                           
        const newMessage: NewMessageDTO = new NewMessageDTO(incomingMessageDTO.chatId, message);
        const retrievedMessage: Message = await this.chatCommand.sendMessage(newMessage);
        return retrievedMessage;
    }
    async deleteChat(chatId: string): Promise<void> {
        await this.chatCommand.deleteChat(chatId);
        const dir = path.join(__dirname, `../../../../FrontEnd/public/chats/${chatId}`)
        if(!fs.existsSync(dir))
            {
                fs.rmSync(dir, { recursive: true, force: true });
            } 
    }
    async getChatByUserId(userId: string): Promise<Array<Chat>> {
        const retrievedChats: Array<Chat> = await this.chatQuery.getChatByUserId(userId);
        return retrievedChats;
    }    
    async readMessage(indexMessage:number, chatId:string): Promise<void>{
        await this.chatCommand.readMessage(indexMessage, chatId);
    }
}
export default ChatServices;

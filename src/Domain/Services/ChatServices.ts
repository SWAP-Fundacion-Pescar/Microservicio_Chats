import IncomingMessageDTO from "../../Application/DTO/IncomingMessageDTO.js";
import CreateChatRequest from "../../Application/Requests/CreateChatRequest.js";
import IChatCommand from "../../Infrastructure/Interfaces/IChatCommand.js";
import IChatQuery from "../../Infrastructure/Interfaces/IChatQuery.js";
import NewMessageDTO from "../DTO/NewMessageDTO.js";
import Chat from "../Entities/Chat.js";
import Message from "../Entities/Message.js";
import IChatServices from "../Interfaces/IChatServices.js";
import Media from "../Entities/Media.js";
import { fileTypeFromBuffer } from 'file-type';
import ConflictException from "../../Application/Exceptions/ConflictException.js";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import UpdateConfirmationStateRequest from "../../Application/Requests/UpdateConfirmationStateRequest.js";

cloudinary.config({
    cloud_name: 'dojyoiv2g',
    api_key: '913584591931997',
    api_secret: 'RP5zkiAoI5EQX4Mg36_97pgndsI',
});
class ChatServices implements IChatServices {
    private chatCommand: IChatCommand;
    private chatQuery: IChatQuery;
    constructor(chatCommand: IChatCommand, chatQuery: IChatQuery) {
        this.chatCommand = chatCommand;
        this.chatQuery = chatQuery;
    }
    async createChat(createChatRequest: CreateChatRequest): Promise<Chat> {
        const createdChat: Chat = await this.chatCommand.createChat(createChatRequest);
        return createdChat;
    }
    async sendMessage(incomingMessageDTO: IncomingMessageDTO): Promise<Message> {
        const message: Message = new Message(incomingMessageDTO.userId, incomingMessageDTO.content);
    
        if (incomingMessageDTO.media) {
            const buffer = Buffer.from(incomingMessageDTO.media.content, 'base64');
            const fileType = await fileTypeFromBuffer(buffer);
            console.log(fileType);
            if (!fileType) throw new ConflictException('File without extension');
            let fileExtension = fileType.ext;            
            const uploadToCloudinary = (buffer: Buffer) => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            resource_type: 'auto',
                            folder: `chats/${incomingMessageDTO.chatId}`,
                            public_id: `${Date.now()}_${incomingMessageDTO.chatId}`,
                            format: fileExtension,                       
                        },
                        (error, result) => {
                            if (error) {
                                reject(new ConflictException('Error uploading media to Cloudinary'));
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    
                    const readableStream = new Readable();
                    readableStream.push(buffer);
                    readableStream.push(null);  
                    readableStream.pipe(uploadStream);
                });
            };
    
            const result: any = await uploadToCloudinary(buffer);
    
            const messageMedia: Media = new Media(result.secure_url, 'image');
            message.media = messageMedia;
        }
    
        const newMessage: NewMessageDTO = new NewMessageDTO(incomingMessageDTO.chatId, message);
        const retrievedMessage: Message = await this.chatCommand.sendMessage(newMessage);
        return retrievedMessage;
    }
    async deleteChat(chatId: string): Promise<void> {
        await this.chatCommand.deleteChat(chatId);

        const resources = await cloudinary.api.resources({
            type: 'upload',
            prefix: `chats/${chatId}`,  
        });

        for (const resource of resources.resources) {
            await cloudinary.uploader.destroy(resource.public_id, (error: any, result: any) => {
                if (error) {
                    throw new Error(`Failed to delete media with public_id ${resource.public_id}`);
                }
                return result;
            });
        }

        await cloudinary.api.delete_folder(`chats/${chatId}`);
    }
    async getChatByUserId(userId: string): Promise<Array<Chat>> {
        const retrievedChats: Array<Chat> = await this.chatQuery.getChatByUserId(userId);
        return retrievedChats;
    }
    async readMessage(messageId: string, chatId: string): Promise<void> {
        await this.chatCommand.readMessage(messageId, chatId);
    }
    async updateConfirmationState(updateConfirmationStateRequest: UpdateConfirmationStateRequest): Promise<Chat>
    {
        const updatedChat = await this.chatCommand.updateConfirmationState(updateConfirmationStateRequest);
        return updatedChat;
    }

}
export default ChatServices;

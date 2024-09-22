import IncomingMessageDTO from "../../Application/DTO/IncomingMessageDTO";
import CreateChatRequest from "../../Application/Requests/CreateChatRequest";
import IChatCommand from "../../Infrastructure/Interfaces/IChatCommand";
import IChatQuery from "../../Infrastructure/Interfaces/IChatQuery";
import NewMessageDTO from "../DTO/NewMessageDTO";
import Chat from "../Entities/Chat";
import Message from "../Entities/Message";
import IChatServices from "../Interfaces/IChatServices";
import Media from "../Entities/Media";
import { fileTypeFromBuffer } from 'file-type';
import ConflictException from "../../Application/Exceptions/ConflictException";
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

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
            const buffer = Buffer.from(incomingMessageDTO.media.buffer);
            // const fileType = await fileTypeFromBuffer(buffer);
            // if (!fileType) throw new ConflictException('File without extension');
    
            // Function to upload using Cloudinary's upload_stream with Promises
            const uploadToCloudinary = (buffer: Buffer) => {
                return new Promise((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            resource_type: 'auto',
                            folder: `chats/${incomingMessageDTO.chatId}`,
                            public_id: `${Date.now()}_${incomingMessageDTO.chatId}`                            
                        },
                        (error, result) => {
                            if (error) {
                                reject(new ConflictException('Error uploading media to Cloudinary'));
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    
                    // Convert the buffer into a readable stream and pipe it to Cloudinary
                    const readableStream = new Readable();
                    readableStream.push(buffer);
                    readableStream.push(null); // Indicate the end of the stream
                    readableStream.pipe(uploadStream);
                });
            };
    
            // Upload the media to Cloudinary
            const result: any = await uploadToCloudinary(buffer);
    
            // Use the secure_url from Cloudinary
            const messageMedia: Media = new Media(result.secure_url, 'image');
            message.media = messageMedia;
        }
    
        const newMessage: NewMessageDTO = new NewMessageDTO(incomingMessageDTO.chatId, message);
        const retrievedMessage: Message = await this.chatCommand.sendMessage(newMessage);
        return retrievedMessage;
    }
    async deleteChat(chatId: string): Promise<void> {
        // Delete the chat itself using your existing command
        await this.chatCommand.deleteChat(chatId);

        // Get all resources (media files) in the specific chat folder in Cloudinary
        const resources = await cloudinary.api.resources({
            type: 'upload',
            prefix: `chats/${chatId}`,  // This targets files stored under the folder chats/{chatId}
        });

        // Delete each resource found in the Cloudinary folder
        for (const resource of resources.resources) {
            await cloudinary.uploader.destroy(resource.public_id, (error: any, result: any) => {
                if (error) {
                    throw new Error(`Failed to delete media with public_id ${resource.public_id}`);
                }
                return result;
            });
        }

        // (Optional) Delete the folder itself if necessary, though Cloudinary auto-manages empty folders
        await cloudinary.api.delete_folder(`chats/${chatId}`);
    }
    async getChatByUserId(userId: string): Promise<Array<Chat>> {
        const retrievedChats: Array<Chat> = await this.chatQuery.getChatByUserId(userId);
        return retrievedChats;
    }
    async readMessage(messageId: string, chatId: string): Promise<void> {
        await this.chatCommand.readMessage(messageId, chatId);
    }
}
export default ChatServices;

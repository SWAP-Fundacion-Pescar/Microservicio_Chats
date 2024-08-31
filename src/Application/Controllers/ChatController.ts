import {Request, Response, NextFunction} from 'express';
import IChatServices from "../../Domain/Interfaces/IChatServices";
import CreateChatRequest from '../Requests/CreateChatRequest';
import Chat from '../../Domain/Entities/Chat';
import ReadMessageRequest from '../Requests/ReadMessageRequest';

class ChatController 
{
    private chatServices: IChatServices;
    constructor(chatServices: IChatServices)
    {
        this.chatServices = chatServices;
        this.createChat = this.createChat.bind(this);
        this.deleteChat = this.deleteChat.bind(this);
        this.getChatsByUserId = this.getChatsByUserId.bind(this);     
        this.readMessage = this.readMessage.bind(this);   
    }
    async createChat(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { senderUserId, receiverUserId} : CreateChatRequest = req.body;
            const createChatRequest: CreateChatRequest = new CreateChatRequest(senderUserId, receiverUserId);
            const createdChat = await this.chatServices.createChat(createChatRequest);
            res.status(200).send(createdChat.id); // Solo deberia ser utilizado por el microservicio de Intercambios
        }
        catch(error)
        {
            next(error);
        }
    }
    async deleteChat(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const chatId  = req.params.chatId as string;
            await this.chatServices.deleteChat(chatId);
            res.status(200).send('El chat se elimino con exito') // Solo deberia ser utilizado por el microservicio de Intercambios
        }
        catch(error)
        {
            next(error);
        }
    }
    async getChatsByUserId(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const userId = req.params.userId as string;
            const retrievedChats: Array<Chat> = await this.chatServices.getChatByUserId(userId);
            res.status(200).send(retrievedChats);
        }
        catch(error)
        {
            next(error);
        }
    }
    async readMessage(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const {indexMessage, chatId} : ReadMessageRequest = req.body;
            await this.chatServices.readMessage(indexMessage, chatId);
            res.status(200).send('Ok.');
        }catch (error){
            next(error);
        }
    }
}
export default ChatController;
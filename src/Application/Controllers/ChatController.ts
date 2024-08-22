import {Request, Response, NextFunction} from 'express';
import IChatServices from "../../Domain/Interfaces/IChatServices";
import CreateChatRequest from '../Requests/CreateChatRequest';
import Chat from '../../Domain/Entities/Chat';

class ChatController 
{
    private chatServices: IChatServices;
    constructor(chatServices: IChatServices)
    {
        this.chatServices = chatServices;
        this.createChat = this.createChat.bind(this);
        this.deleteChat = this.deleteChat.bind(this);
        this.getChatsByUserId = this.getChatsByUserId.bind(this);        
    }
    async createChat(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { senderUserId, receiverUserId} : CreateChatRequest = req.body;
            const createChatRequest: CreateChatRequest = new CreateChatRequest(senderUserId, receiverUserId);
            const createdChat = await this.chatServices.createChat(createChatRequest);
            res.status(200).send('Se creo el chat con exito');
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
            res.status(200).send('El chat se elimino con exito')
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
}
export default ChatController;
import {Request, Response, NextFunction} from 'express';
import IChatServices from "../../Domain/Interfaces/IChatServices.js";
import CreateChatRequest from '../Requests/CreateChatRequest.js';
import Chat from '../../Domain/Entities/Chat.js';
import ReadMessageRequest from '../Requests/ReadMessageRequest.js';
import UpdateConfirmationStateRequest from '../Requests/UpdateConfirmationStateRequest.js';

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
        this.updateConfirmationState = this.updateConfirmationState.bind(this);
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
            const {messageId, chatId} : ReadMessageRequest = req.body;
            await this.chatServices.readMessage(messageId, chatId);
            res.status(200).send('Ok.');
        }catch (error){
            next(error);
        }
    }
    async updateConfirmationState(req: Request, res: Response, next: NextFunction): Promise<void>
    {
        try
        {
            const { chatId, senderUserExchangeConfirmation, receiverUserExchangeConfirmation } : UpdateConfirmationStateRequest = req.body;
            const updateConfirmationStateRequest = new UpdateConfirmationStateRequest(chatId, senderUserExchangeConfirmation, receiverUserExchangeConfirmation);
            const updatedChat = await this.chatServices.updateConfirmationState(updateConfirmationStateRequest);
            res.status(200).send(updatedChat);
        }
        catch(error)
        {
            next(error)
        }
    }
}
export default ChatController;
import { Router } from "express";
import IChatQuery from "../../Infrastructure/Interfaces/IChatQuery";
import ChatQuery from "../../Infrastructure/Query/ChatQuery";
import IChatCommand from "../../Infrastructure/Interfaces/IChatCommand";
import ChatCommand from "../../Infrastructure/Command/ChatCommand";
import ChatController from "../Controllers/ChatController";
import IChatServices from "../../Domain/Interfaces/IChatServices";
import ChatServices from "../../Domain/Services/ChatServices";



const chatQuery: IChatQuery = new ChatQuery();
const chatCommand: IChatCommand = new ChatCommand();
const chatServices: IChatServices = new ChatServices(chatCommand, chatQuery);
const chatController: ChatController = new ChatController(chatServices);
const ChatRouter = Router();
ChatRouter.post('/chat', chatController.createChat);
ChatRouter.delete('/chat', chatController.deleteChat);
ChatRouter.get('/chats', chatController.getChatsByUserId);

export default ChatRouter;
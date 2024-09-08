import { Router } from "express";
import IChatQuery from "../../Infrastructure/Interfaces/IChatQuery";
import ChatQuery from "../../Infrastructure/Query/ChatQuery";
import IChatCommand from "../../Infrastructure/Interfaces/IChatCommand";
import ChatCommand from "../../Infrastructure/Command/ChatCommand";
import ChatController from "../Controllers/ChatController";
import IChatServices from "../../Domain/Interfaces/IChatServices";
import ChatServices from "../../Domain/Services/ChatServices";
import { validateCreateChat, validateReadMessage, validateDeleteChat } from "../Middleware/Validator/ChatValidator";
import { authenticateJwt } from "../Middleware/PassportMiddleware";
import validationErrorHandler from "../Middleware/Validator/ValidationErrorHandler";



const chatQuery: IChatQuery = new ChatQuery();
const chatCommand: IChatCommand = new ChatCommand();
const chatServices: IChatServices = new ChatServices(chatCommand, chatQuery);
const chatController: ChatController = new ChatController(chatServices);
const ChatRouter = Router();
ChatRouter.post('/chat', validateCreateChat, validationErrorHandler, chatController.createChat);
ChatRouter.delete('/chat/:chatId', validateDeleteChat, validationErrorHandler, chatController.deleteChat);
ChatRouter.get('/chats/:userId', chatController.getChatsByUserId);
ChatRouter.put('/chats/read', validateReadMessage, validationErrorHandler, chatController.readMessage);

export default ChatRouter;
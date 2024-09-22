import { Router } from "express";
import IChatQuery from "../../Infrastructure/Interfaces/IChatQuery.js";
import ChatQuery from "../../Infrastructure/Query/ChatQuery.js";
import IChatCommand from "../../Infrastructure/Interfaces/IChatCommand.js";
import ChatCommand from "../../Infrastructure/Command/ChatCommand.js";
import ChatController from "../Controllers/ChatController.js";
import IChatServices from "../../Domain/Interfaces/IChatServices.js";
import ChatServices from "../../Domain/Services/ChatServices.js";
import { validateCreateChat, validateReadMessage, validateDeleteChat } from "../Middleware/Validator/ChatValidator.js";
import { authenticateJwt } from "../Middleware/PassportMiddleware.js";
import validationErrorHandler from "../Middleware/Validator/ValidationErrorHandler.js";



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
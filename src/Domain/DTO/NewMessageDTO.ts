import Message from "../Entities/Message.js";

class NewMessageDTO
{
    chatId: string;
    message: Message;
    constructor(chatId: string, message: Message)
    {
        this.chatId = chatId;
        this.message = message;
    }
}
export default NewMessageDTO;
import Message from "../Entities/Message";

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
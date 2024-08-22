import Message from "./Message";
class Chat
{
    id?: string;
    senderUserId: string;
    receiverUserId: string;
    messages: Array<Message>;
    constructor(senderUserId: string, receiverUserId: string, id?: string, messages?: Array<Message>)
    {
        this.id = id;
        this.senderUserId = senderUserId;
        this.receiverUserId = receiverUserId;
        this.messages = messages ?? new Array<Message>();
    }
}
export default Chat;
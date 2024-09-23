import Message from "./Message.js";
class Chat
{
    id?: string;
    senderUserId: string;
    receiverUserId: string;
    messages: Array<Message>;
    senderUserExchangeConfirmation: Boolean;
    receiverUserExchangeConfirmation: Boolean;
    constructor(senderUserId: string, receiverUserId: string, senderUserExchangeConfirmation: Boolean, receiverUserExchangeConfirmation: Boolean ,id?: string, messages?: Array<Message> )
    {
        this.id = id;
        this.senderUserId = senderUserId;
        this.receiverUserId = receiverUserId;
        this.messages = messages ?? new Array<Message>();
        this.senderUserExchangeConfirmation = senderUserExchangeConfirmation;
        this.receiverUserExchangeConfirmation = receiverUserExchangeConfirmation;
    }
}
export default Chat;
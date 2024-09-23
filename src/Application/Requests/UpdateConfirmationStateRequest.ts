class UpdateConfirmationStateRequest
{
    chatId: string;
    senderUserExchangeConfirmation?: Boolean;
    receiverUserExchangeConfirmation?: Boolean;
    constructor(chatId: string, senderUserExchangeConfirmation?: Boolean, receiverUserExchangeConfirmation?: Boolean)
    {
        this.chatId = chatId;
        this.senderUserExchangeConfirmation = senderUserExchangeConfirmation;
        this.receiverUserExchangeConfirmation = receiverUserExchangeConfirmation;
    }
}
export default UpdateConfirmationStateRequest;
class ReadMessageRequest
{
    indexMessage: number;
    chatId: string;
    constructor(indexMessage: number, chatId: string)
    {
        this.indexMessage = indexMessage;
        this.chatId = chatId;
    }
}
export default ReadMessageRequest;
class IncomingMessageDTO
{
    userId: string;
    receiverUserId: string;
    chatId: string;
    content?: string;
    media?: DataView;
    constructor(userId: string, receiverUserId: string, chatId: string, content: string, media: DataView)
    {
        this.userId = userId;
        this.receiverUserId = receiverUserId;
        this.chatId = chatId;
        this.content = content;
        this.media = media;
    }
}
export default IncomingMessageDTO;
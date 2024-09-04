class IncomingMessageDTO
{
    userId: string;
    chatId: string;
    content?: string;
    media?: DataView;
    constructor(userId: string, chatId: string, content: string, media: DataView)
    {
        this.userId = userId;
        this.chatId = chatId;
        this.content = content;
        this.media = media;
    }
}
export default IncomingMessageDTO;
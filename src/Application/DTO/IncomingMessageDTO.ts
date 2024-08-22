class IncomingMessageDTO
{
    userId: string;
    chatId: string;
    content: string;
    media?: File;
    constructor(userId: string, chatId: string, content: string, media: File)
    {
        this.userId = userId;
        this.chatId = chatId;
        this.content = content;
        this.media = media;
    }
}
export default IncomingMessageDTO;
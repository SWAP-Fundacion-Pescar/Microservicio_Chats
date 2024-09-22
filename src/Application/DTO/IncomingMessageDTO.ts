class IncomingMessageDTO {
    userId: string;
    receiverUserId: string;
    chatId: string;
    content?: string;
    media?: {
        filename: string;
        content: string; // Base64 string
        mimeType: string; // MIME type of the file
    };

    constructor(
        userId: string,
        receiverUserId: string,
        chatId: string,
        content: string,
        media?: { filename: string; content: string; mimeType: string }
    ) {
        this.userId = userId;
        this.receiverUserId = receiverUserId;
        this.chatId = chatId;
        this.content = content;
        this.media = media;
    }
}

export default IncomingMessageDTO;

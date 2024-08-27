import Media from "./Media";

class Message
{
    userId: string;
    content: string;
    createdAt?: Date;    
    isRead: boolean;
    media?: Media;
    constructor(userId: string, content: string, media?: Media, createdAt?: Date, isRead?: boolean)
    {
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
        this.isRead = isRead ?? false;
        this.media = media;
    }
}       
export default Message;
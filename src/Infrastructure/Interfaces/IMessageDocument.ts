import { Document } from "mongoose";
interface IMessageDocument extends Document
{
    userId: string;
    content: string;
    createdAt?: Date;    
    isRead: boolean;
    media?: Object;
}
export default IMessageDocument;
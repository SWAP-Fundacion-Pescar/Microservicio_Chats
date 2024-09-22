import { Document } from "mongoose";
import IMediaDocument from "./IMediaDocument.js";
interface IMessageDocument extends Document
{
    userId: string;
    content: string;
    createdAt?: Date;    
    isRead: boolean;
    media?: IMediaDocument;
}
export default IMessageDocument;
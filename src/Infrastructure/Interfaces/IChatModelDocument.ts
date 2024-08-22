import { Document } from "mongoose";
import Message from "../../Domain/Entities/Message";

interface IChatDocument extends Document
{
    senderUserId: string;
    receiverUserId: string;
    messages: Array<Message>;
}
export default IChatDocument;
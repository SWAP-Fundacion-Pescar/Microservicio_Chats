import { Document, Types } from "mongoose";
import IMessageDocument from "./IMessageDocument";

interface IChatDocument extends Document
{
    senderUserId: string;
    receiverUserId: string;
    messages: Types.DocumentArray<IMessageDocument>;
}
export default IChatDocument;
import mongoose, { Schema, Types } from "mongoose";
import IChatDocument from "../../Interfaces/IChatModelDocument";
import { messageSchema } from "./MessageModel";

const chatSchema: Schema<IChatDocument> = new mongoose.Schema(
    {
        senderUserId: { type: String, required: true },
        receiverUserId: { type: String, required: true },
        messages: {type: [messageSchema]}
    });
const ChatModel = mongoose.model('Chat', chatSchema);
export default ChatModel;
import mongoose, { Schema } from "mongoose";
import IChatDocument from "../../Interfaces/IChatModelDocument";
import IMessageDocument from "../../Interfaces/IMessageDocument";

const messageSchema: Schema<IMessageDocument> = new mongoose.Schema(
    {
        userId: { type: String, required: true},
        content: { type: String },
        createdAt: { type: Date, default: Date.now()},
        isRead: { type: Boolean, defualt: false },
        media: { type: Object },
    })

const chatSchema: Schema<IChatDocument> = new mongoose.Schema(
    {
        senderUserId: { type: String, required: true },
        receiverUserId: { type: String, required: true },
        messages: { type: [messageSchema] }
    });
const ChatModel = mongoose.model('Chat', chatSchema);
export default ChatModel;
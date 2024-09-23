import mongoose, { Schema, Types } from "mongoose";
import IChatDocument from "../../Interfaces/IChatModelDocument.js";
import { messageSchema } from "./MessageModel.js";

const chatSchema: Schema<IChatDocument> = new mongoose.Schema(
    {
        senderUserId: { type: String, required: true },
        receiverUserId: { type: String, required: true },
        messages: {type: [messageSchema]},
        senderUserExchangeConfirmation: {type: Boolean, default: false},
        receiverUserExchangeConfirmation: {type: Boolean, default: false}
    });
const ChatModel = mongoose.model('Chat', chatSchema);
export default ChatModel;
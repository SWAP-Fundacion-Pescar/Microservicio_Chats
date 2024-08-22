import mongoose, { Schema } from "mongoose";
import IChatDocument from "../../Interfaces/IChatModelDocument";

const chatSchema: Schema<IChatDocument> = new mongoose.Schema(
    {
        senderUserId: {type: String, required: true},
        receiverUserId: {type: String, required: true},
        messages: {messages: [Object]}
    });
const ChatModel = mongoose.model('Chat', chatSchema);
export default ChatModel;
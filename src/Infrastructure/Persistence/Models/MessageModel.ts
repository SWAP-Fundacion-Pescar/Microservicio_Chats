import mongoose, { Schema } from "mongoose";
import IMessageDocument from "../../Interfaces/IMessageDocument";
import IMediaDocument from "../../Interfaces/IMediaDocument";

const mediaSchema: Schema<IMediaDocument> = new mongoose.Schema(
    {
        _id: false,
        url: { type: String, required: true},
        type: { type: String}        
    })

const messageSchema: Schema<IMessageDocument> = new mongoose.Schema(
    {
        userId: { type: String, required: true},
        content: { type: String },
        createdAt: { type: Date, default: Date.now},
        isRead: { type: Boolean, defualt: false },
        media: { type: mediaSchema },
    });

const MessageModel = mongoose.model('Message', messageSchema);

export 
{
    messageSchema,
    MessageModel
};

import { Document } from "mongoose";
interface IMediaDocument extends Document
{
    url: string;
    type: string;
}
export default IMediaDocument;
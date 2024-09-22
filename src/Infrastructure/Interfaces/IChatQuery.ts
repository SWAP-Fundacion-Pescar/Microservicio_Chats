import IChatDocument from "./IChatModelDocument.js";

interface IChatQuery
{
    getChatByUserId(userId: string): Promise<Array<IChatDocument>>;
}
export default IChatQuery;
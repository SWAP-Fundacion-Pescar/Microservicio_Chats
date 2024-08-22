import IChatDocument from "./IChatModelDocument";

interface IChatQuery
{
    getChatByUserId(userId: string): Promise<Array<IChatDocument>>;
}
export default IChatQuery;
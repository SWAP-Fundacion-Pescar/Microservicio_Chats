class CreateChatRequest
{
    senderUserId: string;
    receiverUserId: string;
    constructor(senderUserId: string, receiverUserId: string)
    {
        this.senderUserId = senderUserId;
        this.receiverUserId = receiverUserId
    }
}
export default CreateChatRequest;
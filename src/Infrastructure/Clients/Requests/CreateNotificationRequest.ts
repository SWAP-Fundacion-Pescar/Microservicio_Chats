class CreateNotificationRequest{
    userId: string;
    content: string;
    type: string;
    hasImage?: boolean;
    constructor(userId: string, content: string, type:string, hasImage?: boolean){
        this.userId=userId;
        this.content=content;
        this.type = type;
        this.hasImage=hasImage ?? false;   
    }
}
export default CreateNotificationRequest; 
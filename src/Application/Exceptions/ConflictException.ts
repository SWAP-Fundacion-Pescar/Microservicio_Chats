import BaseException from "./BaseException";
class ConflictException extends BaseException
{
    constructor(message: string = "There was a conflict")
    {
        super(message);
    }
}
export default ConflictException;
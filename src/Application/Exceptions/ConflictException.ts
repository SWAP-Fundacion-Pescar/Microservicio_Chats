import BaseException from "./BaseException.js";
class ConflictException extends BaseException
{
    constructor(message: string = "There was a conflict")
    {
        super(message);
    }
}
export default ConflictException;
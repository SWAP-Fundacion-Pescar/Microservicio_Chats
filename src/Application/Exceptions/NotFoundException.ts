import BaseException from "./BaseException";

class NotFoundException extends BaseException
{
    constructor(message: string = "Not found")
    {
        super(message);
    }
}

export default NotFoundException;
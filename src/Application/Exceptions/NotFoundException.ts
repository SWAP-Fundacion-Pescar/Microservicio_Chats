import BaseException from "./BaseException.js";

class NotFoundException extends BaseException
{
    constructor(message: string = "Not found")
    {
        super(message);
    }
}

export default NotFoundException;
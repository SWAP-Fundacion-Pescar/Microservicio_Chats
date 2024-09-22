import BaseException from "./BaseException.js";
class UnauthorizedException extends BaseException {
    constructor(message: string = "Unauthorized access") {
        super(message);
    }
}
export default UnauthorizedException;
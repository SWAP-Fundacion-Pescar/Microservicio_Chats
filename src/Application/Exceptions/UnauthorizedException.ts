import BaseException from "./BaseException";
class UnauthorizedException extends BaseException {
    constructor(message: string = "Unauthorized access") {
        super(message);
    }
}
export default UnauthorizedException;
import BaseException from "./BaseException";
class ValidationException extends BaseException {
    constructor(message: string = "Validation error", public details?: any) {
        super(message);
    }
}
export default ValidationException;
import ClientError from "./client_error.js";

class InputError extends ClientError {
    constructor(message, code = 400) {
        super(message, code);
        this.name = 'InputError';
    }
}

export default InputError;
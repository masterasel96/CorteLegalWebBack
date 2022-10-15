import { HttpCodes, HttpMessages } from "../Http.enum";
import DomainError from "../Error";

export class InvalidSchemaException extends DomainError {
    constructor(
        _message: string,
        _code: number = HttpCodes.HTTP_BAD_REQUEST
    ) {
        super(`${HttpMessages.INVALID_REQUEST_STRUCTURE_MESSAGE}: ${_message}`, _code)
    }
}
import { HttpCodes, HttpMessages } from "../http.enum";
import DomainError from "../domain.error";

export class InvalidSchemaException extends DomainError {
    constructor(
        _message: string,
        _code: number = HttpCodes.HTTP_BAD_REQUEST
    ) {
        super(`${HttpMessages.INVALID_REQUEST_STRUCTURE_MESSAGE}: ${_message}`, _code)
    }
}
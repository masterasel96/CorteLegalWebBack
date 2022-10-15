import { HttpCodes, HttpMessages } from "../Http.enum";
import DomainError from "../Error";

export class InvalidApiKeyException extends DomainError {
    constructor(
        _message: string = HttpMessages.UNAUTHORIZE_APIKEY_MESSAGE,
        _code: number = HttpCodes.HTTP_UNAUTHORIZED
    ) {
        super(_message, _code)
    }
}

export class InvalidUserException extends DomainError {
    constructor(
        _message: string = HttpMessages.UNAUTHORIZE_USER_MESSAGE,
        _code: number = HttpCodes.HTTP_UNAUTHORIZED
    ) {
        super(_message, _code)
    }
}
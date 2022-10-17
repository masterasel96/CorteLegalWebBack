import { HttpCodes, HttpMessages } from "../http.enum";
import DomainError from "../domain.error";

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
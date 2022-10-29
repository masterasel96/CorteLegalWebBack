import DomainError from "../../../shared/domain/domain.error"
import { HttpCodes, HttpMessages } from "../../../shared/domain/http.enum"


export class InvalidEnvironmentVariables extends DomainError {
    constructor(
        _message: string = 'Invalid mailer environment variables',
        _code: number = HttpCodes.HTTP_INTERNAL_ERROR
    ) {
        super(_message, _code)
    }
}
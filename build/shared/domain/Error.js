"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DomainError extends Error {
    constructor(_message, _code) {
        super(_message);
        this._message = _message;
        this._code = _code;
    }
    get message() {
        return this._message;
    }
    get code() {
        return this._code;
    }
}
exports.default = DomainError;

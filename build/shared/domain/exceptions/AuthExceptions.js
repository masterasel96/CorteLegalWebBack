"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUserException = exports.InvalidApiKeyException = void 0;
const BaseController_enum_1 = require("../BaseController.enum");
const Error_1 = __importDefault(require("../Error"));
class InvalidApiKeyException extends Error_1.default {
    constructor(_message = BaseController_enum_1.HttpMessages.UNAUTHORIZE_APIKEY_MESSAGE, _code = BaseController_enum_1.HttpCodes.HTTP_UNAUTHORIZED) {
        super(_message, _code);
    }
}
exports.InvalidApiKeyException = InvalidApiKeyException;
class InvalidUserException extends Error_1.default {
    constructor(_message = BaseController_enum_1.HttpMessages.UNAUTHORIZE_USER_MESSAGE, _code = BaseController_enum_1.HttpCodes.HTTP_UNAUTHORIZED) {
        super(_message, _code);
    }
}
exports.InvalidUserException = InvalidUserException;

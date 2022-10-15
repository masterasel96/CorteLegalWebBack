"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const basic_auth_1 = __importDefault(require("basic-auth"));
const express_1 = require("express");
const BaseController_enum_1 = require("./BaseController.enum");
const AuthExceptions_1 = require("./exceptions/AuthExceptions");
class BaseController {
    constructor(_path, _router = (0, express_1.Router)()) {
        this._path = _path;
        this._router = _router;
        this.config();
    }
    get path() {
        return this._path;
    }
    get router() {
        return this._router;
    }
    auth(req) {
        const credentials = (0, basic_auth_1.default)(req);
        if (!credentials
            || credentials.name !== process.env.AUTH_NAME
            || credentials.pass !== process.env.AUTH_PASS)
            throw new AuthExceptions_1.InvalidUserException();
        const apiKey = req.get("X-Api-Key");
        const apiName = req.get("X-Api-Name");
        if (!apiName || !apiKey || apiKey !== process.env.APIKEY)
            throw new AuthExceptions_1.InvalidApiKeyException();
    }
    catchError(res, error) {
        this.failJson(res, error.message, error.code);
    }
    successJson(res, message, data = null, statusCode = BaseController_enum_1.HttpCodes.HTTP_SUCCESS) {
        res.status(statusCode).json(data ? { message, data } : { message });
    }
    failJson(res, message, statusCode = BaseController_enum_1.HttpCodes.HTTP_INTERNAL_ERROR, errors = null) {
        res.status(statusCode).json(errors ? { message, errors } : { message });
    }
}
exports.default = BaseController;

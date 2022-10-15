import authv, { BasicAuthResult } from "basic-auth";
import { Request, Response, Router } from "express";
import { Schema, ValidationError, Validator } from 'jsonschema';
import { HttpCodes } from "../domain/Http.enum";
import Error from "../domain/Error";
import { InvalidApiKeyException, InvalidUserException } from "../domain/exceptions/AuthExceptions";
import { InvalidSchemaException } from "../domain/exceptions/ValidationExceptions";

export default abstract class BaseController {

    constructor(
        private _path: string,
        private _router: Router = Router(),
        private _validator: Validator = new Validator()
    ) {
        this.config()
    }

    public get path(): string {
        return this._path
    }

    public get router(): Router {
        return this._router
    }

    /**
     * Router config
     */
    protected abstract config(): void

    protected validate(request: Request, schema: Schema): void {
        const { valid, errors } = this._validator.validate(request.body, schema)
        if (!valid) {
            throw new InvalidSchemaException(this.stringifyErrors(errors))
        }
    }

    private stringifyErrors(errors: ValidationError[]): string {
        return errors.map(({ stack }) => `${stack}`).toString()
    }

    protected auth(req: Request): void {
        const credentials: BasicAuthResult | undefined = authv(req)

        if (!credentials 
            || credentials.name !== process.env.AUTH_NAME 
            || credentials.pass !== process.env.AUTH_PASS)
        throw new InvalidUserException()

        const apiKey = req.get("X-Api-Key")

        if (!apiKey || apiKey !== process.env.APIKEY)
            throw new InvalidApiKeyException()
    } 

    protected catchError(res: Response, error: Error): void {
        this.failJson(res, error.message, error.code)
    }

    protected successJson(
        res: Response, 
        message: string, 
        data: object = null, 
        statusCode = HttpCodes.HTTP_SUCCESS
    ) {
        res.status(statusCode).json(data ? {message, data} : {message})
    }

    protected failJson(
        res: Response, 
        message: string, 
        statusCode: number = HttpCodes.HTTP_INTERNAL_ERROR, 
        errors: string[] = null
    ) {
        res.status(statusCode).json(errors ? {message, errors} : {message})
    }
}
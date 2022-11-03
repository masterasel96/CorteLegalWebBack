import authv, { BasicAuthResult } from "basic-auth"
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit'
import { Request, Response, Router } from "express"
import { Schema, ValidationError, Validator } from 'jsonschema'
import { HttpCodes, TooManyRequest } from "../domain/http.enum"
import Error from "../domain/domain.error"
import { InvalidApiKeyException, InvalidUserException } from "../domain/exceptions/auth.exception"
import { InvalidSchemaException } from "../domain/exceptions/validation.exception"

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
     * 
     * @param time in minutes
     */
    protected rateLimiter(time: number, max: number): RateLimitRequestHandler {
        return rateLimit({
            windowMs: time * 60 * 1000,
            max,
            message: TooManyRequest,
            standardHeaders: true,
            legacyHeaders: false
        })
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
import authv, { BasicAuthResult } from "basic-auth";
import { Request, Response, Router } from "express";
import { HttpCodes } from "./BaseController.enum";
import Error from "./Error";
import { InvalidApiKeyException, InvalidUserException } from "./exceptions/AuthExceptions";

export default abstract class BaseController {

    constructor(
        private _path: string,
        private _router: Router = Router()
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
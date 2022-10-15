import { Request, Response } from "express"
import BaseController from "../shared/infrastructure/BaseController"
import { HttpMessages } from "../shared/domain/Http.enum"

export default class MainController extends BaseController {
    constructor() {
        super('/health')
    }

    protected config(): void {
        this.router.get('/', (req, res) => this.health(req, res))
    }

    private health(req: Request, res: Response) {
        try {
            this.auth(req)
            this.successJson(res, HttpMessages.SUCCESS_OPERATION_MESSAGE)
        } catch (error) {
            this.catchError(res, error)
        }
    }
}
import { Request, Response } from "express"
import BaseController from "../shared/domain/BaseController"
import { HttpMessages } from "../shared/domain/BaseController.enum"

export default class ExampleController extends BaseController {
    constructor() {
        super('/example')
    }

    protected config(): void {
        this.router.get('/', (req, res) => this.example(req, res))
    }

    private example(req: Request, res: Response) {
        try {
            this.auth(req)
            this.successJson(res, HttpMessages.SUCCESS_OPERATION_MESSAGE)
        } catch (error) {
            this.catchError(res, error)
        }
    }
}
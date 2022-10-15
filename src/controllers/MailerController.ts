import { Request, Response } from "express"
import BaseController from "../shared/infrastructure/BaseController"
import { HttpMessages } from "../shared/domain/Http.enum"
import { sendMailSchema } from "../shared/infrastructure/schemas/mailer.schemas"

export default class MailerController extends BaseController {
    constructor() {
        super('/mail')
    }

    protected config(): void {
        this.router.post('/', (req, res) => this.send(req, res))
    }

    private send(req: Request, res: Response) {
        try {
            this.auth(req)
            this.validate(req, sendMailSchema)
            //TODO: query handler send email...
            this.successJson(res, HttpMessages.SUCCESS_OPERATION_MESSAGE)
        } catch (error) {
            this.catchError(res, error)
        }
    }
}
import { Request, Response } from "express"
import BaseController from "../shared/infrastructure/base.controller"
import { HttpMessages } from "../shared/domain/http.enum"
import { sendMailSchema } from "../shared/infrastructure/schemas/mailer.schemas"
import MailSenderQueryHandler from "../mailer/application/mail_sender.query_handler"
import MailRepository from "../mailer/infrastructure/mail.repository"
import Mail from "../mailer/domain/mail.entity"

export default class MailerController extends BaseController {
    constructor(
        private mailSenderQH: MailSenderQueryHandler = null
    ) {
        super('/mail')
        this.init()
    }

    protected config(): void {
        this.router.post('/', this.rateLimiter(60, 3), (req, res) => this.send(req, res))
    }

    private async send(req: Request, res: Response) {
        try {
            this.auth(req)
            this.validate(req, sendMailSchema)
            const mail = Mail.fromObject(req.body)
            const response = await this.mailSenderQH.send(mail)
            response ? this.successJson(res, HttpMessages.SUCCESS_OPERATION_MESSAGE, { response }) :
                this.successJson(res, HttpMessages.FAIL_OPERATION_MESSAGE, { response })
        } catch (error) {
            this.catchError(res, error)
        }
    }

    private init(): void {
        const mailRepository = new MailRepository()
        this.mailSenderQH = new MailSenderQueryHandler(mailRepository)
    }
}
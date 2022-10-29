import Mail from '../domain/mail.entity'
import MailerPort from '../domain/mail.port'

export default class MailSenderQueryHandler {
    constructor(
        private mailerPort: MailerPort
    ) {
    }

    public async send(mail: Mail): Promise<boolean> {
        return await this.mailerPort.send(mail)
    }
}
import Mail from '../domain/mail.entity'
import MailerPort from '../domain/mail.port'

export default class MailSenderQueryHandler {
    constructor(
        private mailerPort: MailerPort
    ) {
    }

    public send(mail: Mail): void {
        this.mailerPort.send(mail)
    }
}
import { createTransport, Transporter } from 'nodemailer'
import { Options as MailOptions } from 'nodemailer/lib/mailer'
import { Options as TransportOptions } from 'nodemailer/lib/smtp-transport';
import Mail from '../domain/mail.entity';
import MailerPort from '../domain/mail.port';

export default class MailRepository implements MailerPort {
    constructor(
        private mailTransporter: Transporter = null
    ) {
        this.init() 
    }

    private init(): void {
        // TODO: control errors
        const config = this.config()
        this.mailTransporter = createTransport(config)
    }

    private config(): TransportOptions {
        // TODO: control errors
        const clientId = process.env.OAUTH2_CLIENT_ID
        const clientSecret = process.env.OAUTH2_CLIENT_SECRET
        const refreshToken = process.env.GOOGLE_MAIL_REFRESH_TOKEN

        const type = 'OAuth2'
        const user = process.env.GOOGLE_MAIL_ACCOUNT
        const service = 'gmail'

        return {
            service,
            auth: { type, user, clientId, clientSecret, refreshToken }
        }
    }

    private ownMailOptions(mail: Mail): MailOptions {
        const mailAccount = process.env.GOOGLE_MAIL_ACCOUNT

        return {
            from: `"CONTACTO WEB" <${mailAccount}>`,
            to: `${mailAccount}`,
            subject: "CONTACTO WEB",
            html: mail.toHtmlString()
        }
    }

    private clientMailOptions({ email }: Mail): MailOptions {
        const mailAccount = process.env.GOOGLE_MAIL_ACCOUNT

        return {
            from: `"Corte Legal Abogados" <${mailAccount}>`,
            to: `${email}`,
            subject: "Mensaje enviado",
            html: `<p>Muchas gracias por su confianza,
                en breve nuestro equipo de especialistas se pondrá en contacto con usted.<p>`
        }
    }

    public async send(mail: Mail): Promise<void> {
        // TODO: control errors and send mail responses

        const ownMail = this.ownMailOptions(mail)
        await this.mailTransporter.sendMail(ownMail)

        const clientMail = this.clientMailOptions(mail)
        await this.mailTransporter.sendMail(clientMail)
    }

}
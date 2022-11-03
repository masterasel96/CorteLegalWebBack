import { createTransport, Transporter, createTestAccount } from 'nodemailer'
import { Options as MailOptions } from 'nodemailer/lib/mailer'
import { Options as TransportOptions } from 'nodemailer/lib/smtp-transport'
import { SentMessageInfo } from 'nodemailer/lib/sendmail-transport'
import Mail from '../domain/mail.entity'
import MailerPort from '../domain/mail.port'
import { InvalidEnvironmentVariables } from '../domain/exceptions/mail.exception'
import { Languajes } from '../../shared/domain/languajes.enum'
import { ES_MailMessages, EN_MailMessages, FR_MailMessages, MailMessages } from '../domain/mail.enum'

export default class MailRepository implements MailerPort {
    constructor(
        private mailTransporter: Transporter<SentMessageInfo> = null
    ) {
        this.init()
    }

    private async init(): Promise<void> {
        this.checkEnvironment()
        const config = process.env.ENV !== 'PRODUCTION' ?
            await this.configInDevelopment() : this.config()
        this.mailTransporter = createTransport(config)
    }

    private async configInDevelopment(): Promise<TransportOptions> {
        let { user, pass } = await createTestAccount()

        return {
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: { user, pass }
        }
    }

    private checkEnvironment(): void {
        if (process.env.ENV !== 'PRODUCTION' &&
            (process.env.GOOGLE_MAIL_ACCOUNT === undefined || process.env.GOOGLE_MAIL_ACCOUNT === null)) {
            throw new InvalidEnvironmentVariables()
        }

        if (process.env.ENV === 'PRODUCTION' &&
            (process.env.OAUTH2_CLIENT_ID === undefined || process.env.OAUTH2_CLIENT_ID === null ||
                process.env.OAUTH2_CLIENT_SECRET === undefined || process.env.OAUTH2_CLIENT_SECRET === null ||
                process.env.GOOGLE_MAIL_REFRESH_TOKEN === undefined || process.env.GOOGLE_MAIL_REFRESH_TOKEN === null ||
                process.env.GOOGLE_MAIL_ACCOUNT === undefined || process.env.GOOGLE_MAIL_ACCOUNT === null)) {
            throw new InvalidEnvironmentVariables()
        }
    }

    private config(): TransportOptions {
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

    private clientMailOptions(
        { email }: Mail, 
        { CLIENT_FROM, CLIENT_SUBJECT, CLIENT_TEXT}: MailMessages
    ): MailOptions {
        const mailAccount = process.env.GOOGLE_MAIL_ACCOUNT

        return {
            from: `"${CLIENT_FROM}" <${mailAccount}>`,
            to: `${email}`,
            subject: `${CLIENT_SUBJECT}`,
            html: `<p>${CLIENT_TEXT}<p>`
        }
    }

    public async send(mail: Mail): Promise<boolean> {
        const ownMail = this.ownMailOptions(mail)
        const { accepted } = await this.mailTransporter.sendMail(ownMail)

        if (!accepted.includes(process.env.GOOGLE_MAIL_ACCOUNT)) {
            return false
        }

        const texts = this.getTexts(mail.languaje)
        const clientMail = this.clientMailOptions(mail, texts)
        await this.mailTransporter.sendMail(clientMail)

        return true
    }

    private getTexts(languaje: string): MailMessages {
        switch (languaje) {
            case Languajes.ES_es:
                return ES_MailMessages
            case Languajes.EN_en:
                return EN_MailMessages
            case Languajes.FR_fr:
                return FR_MailMessages
        }
    }
}
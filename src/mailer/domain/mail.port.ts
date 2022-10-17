import Mail from "./mail.entity";

export interface MailerDataSource {

    send(mail: Mail): Promise<boolean>

}
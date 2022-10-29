import Mail from "./mail.entity";

export default interface MailerPort {

    send(mail: Mail): Promise<boolean>

}
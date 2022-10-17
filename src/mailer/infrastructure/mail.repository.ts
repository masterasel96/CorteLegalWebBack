import { createTransport, createTestAccount, Transporter } from 'nodemailer'

export default class SipayRepository {
    constructor(
        private mailTransporter: Transporter
    ) { 
    }
}
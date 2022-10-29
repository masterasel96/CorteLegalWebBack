import { Languajes } from "../../shared/domain/languajes.enum"

export default class Mail {
    constructor(
        private _name: string,
        private _surnames: string,
        private _email: string,
        private _phone: number,
        private _issue: string,
        private _description: string = null,
        private _languaje: Languajes = Languajes.ES_es
    ) { }

    public get name(): string {
        return this._name
    }

    public get surnames(): string {
        return this._surnames
    }

    public get email(): string {
        return this._email
    }

    public get phone(): number {
        return this._phone
    }

    public get issue(): string {
        return this._issue
    }

    public get description(): string|null {
        return this._description
    }

    public get languaje(): Languajes {
        return this._languaje
    }

    public toHtmlString(): string {
        return `<div>
            <p><strong>Nombre: </strong>${this.name} ${this.surnames}<p>
            <p><strong>Email: </strong>${this.email}<p>
            <p><strong>Telefono: </strong>${this.phone}<p>
            <p><strong>Asunto: </strong>${this.issue}<p>
            <p>${this.description ?? 'Sin descripción....'}<p>
        </div>`
    }

    public static fromObject({
        name, surnames, email, 
        phone, issue, description, languaje
    }: any): Mail {
        return new Mail(name, surnames, email, phone, issue, description, languaje)
    }
}
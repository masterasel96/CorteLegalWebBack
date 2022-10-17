export default class Mail {
    constructor(
        private _name: string,
        private _surnames: string,
        private _email: string,
        private _phone: number,
        private _issue: string,
        private _description: string = null
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

    public static fromObject({
        name, surnames, email, 
        phone, issue, description
    }: any): Mail {
        return new Mail(name, surnames, email, phone, issue, description)
    }
}
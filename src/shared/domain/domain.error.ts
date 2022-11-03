export default class DomainError extends Error {
    constructor(
        private _message: string,
        private _code: number
    ) {
        super(_message)
    }

    public get message(): string {
        return this._message
    }

    public get code(): number {
        return this._code
    }
}
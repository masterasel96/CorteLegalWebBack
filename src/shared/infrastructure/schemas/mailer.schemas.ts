import { Schema } from "jsonschema"
import { Languajes } from "../../domain/languajes.enum"

export const sendMailSchema: Schema = {
    type: "object",
    properties: {
        name: {
            type: "string"
        },
        surnames: {
            type: "string"
        },
        email: {
            type: "string",
            format: "email"
        },
        phone: {
            type: "string"
        },
        issue: {
            type: "string",
            minLength: 6
        },
        description: {
            type: "string"
        },
        languaje: {
            enum: Object.values(Languajes)
        }
    },
    required: [
        "name",
        "surnames",
        "email",
        "phone",
        "issue"
    ]
}
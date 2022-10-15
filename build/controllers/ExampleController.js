"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = __importDefault(require("../shared/domain/BaseController"));
class ExampleController extends BaseController_1.default {
    constructor() {
        super('/example');
    }
    config() {
        this.router.get('/', this.example);
        console.log(this.example);
    }
    example(req, res) {
        console.log(this);
        /*try {
            this.auth(req)
            this.successJson(res, HttpMessages.SUCCESS_OPERATION_MESSAGE)
        } catch (error) {
            console.log(error.message);
            this.catchError(res, error)
        }*/
    }
}
exports.default = ExampleController;

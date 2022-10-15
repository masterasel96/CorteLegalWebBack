"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//TODO: import orm from './core/orm.core';
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const ExampleController_1 = __importDefault(require("./controllers/ExampleController"));
class Server {
    constructor(app = (0, express_1.default)(), sharedRouter = new ExampleController_1.default()) {
        this.app = app;
        this.sharedRouter = sharedRouter;
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 3000);
        this.app.use((0, helmet_1.default)());
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        /*this.app.use("*", (req: Request, res: Response) => {
          res.status(404).send();
        });*/
    }
    routes() {
        this.app.use(this.sharedRouter.path, this.sharedRouter.router);
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await orm.connect();
                this.app.listen(this.app.get('port'), () => {
                    console.log(`Corte Legal lawyers Server on port ${this.app.get('port')}`);
                });
            }
            catch (error) {
                console.log(`Corte Legal lawye Server isn´t working: ${error instanceof Error ? error.message : 'Undefined error'}`);
                return false;
            }
            return true;
        });
    }
}
exports.default = Server;

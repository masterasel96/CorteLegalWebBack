import express, { Application } from 'express'
import cors from 'cors'
import helmet from "helmet"
import MainController from './controllers/main.controller'
import BaseController from './shared/infrastructure/base.controller'
import MailerController from './controllers/mail.controller'

export default class Server {
  private controllers: Object[] = [
    new MainController(),
    new MailerController()
  ]

  constructor(public app: Application = express()) {
    this.config()
    this.routes()
  }

  public config(): void {
    this.app.set('port', 3000)
    this.app.use("*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", process.env.ALLOW_ORIGIN)
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Api-Key")
      res.header("Access-Control-Allow-Methods: GET, POST, PUT")
      next();
    });
    this.app.use(cors(
      {
        origin: new RegExp(process.env.ALLOW_ORIGIN),
        methods: "GET,PUT,POST",
        allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization,X-Api-Key"
      }
    ))
    this.app.use(helmet())
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
  }

  public routes(): void {
    this.controllers.forEach((c: BaseController) => this.app.use(c.path, c.router))
  }

  public async start(): Promise<boolean> {
    try {
      this.app.listen(this.app.get('port'), () => {
        console.log(`Corte Legal lawyers Server in mode ${process.env.ENV} on port ${this.app.get('port')}`)
      })
    } catch (error) {
      console.error(`Corte Legal lawye Server isn´t working: ${error instanceof Error ? error.message : 'Undefined error'}`)
      return false
    }
    return true
  }
}



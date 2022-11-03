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
    this.app.use(helmet())
    this.app.use(cors())
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



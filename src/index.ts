import { config } from 'dotenv'
config() // use .env file in tsc build for production

import Server from './server'
const server = new Server()
server.start()
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from '../middleware/cors'


export default function useMiddles<T extends Koa> (app: T): T {

  app.use(logger())
  app.use(cors)
  app.use(bodyParser())
  return app
}
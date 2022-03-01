import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'

export default function useMiddles<T extends Koa> (app: T): T {

  app.use(logger())
  app.use(bodyParser())
  return app
}
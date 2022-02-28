import {Context}  from 'koa'
import {KoaMiddlewareInterface, Middleware} from 'routing-controllers'

@Middleware({type: 'before'})
export class Cors implements KoaMiddlewareInterface {
  use(ctx: Context, next: (err?: any) => Promise<any>): Promise<any> {
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,HEAD,PATCH')
    ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin || ctx.request.origin)
    ctx.set('Access-Control-Allow-Headers', 'content-type')
    ctx.set('Access-Control-Allow-Credentials', 'true')
    ctx.set('Content-Type', 'application/json;charset=utf-8')
    return next()
  }
}
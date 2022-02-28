import {Context} from 'koa'
import jwt from 'jsonwebtoken'
import {KoaMiddlewareInterface} from 'routing-controllers'
import Config from '../config'
import { ResponseCode } from '../../types/global'

export class CheckToken implements KoaMiddlewareInterface {

  use(ctx: Context, next: (err?: any) => Promise<any>): Promise<any> {
    const auth = ctx.request.headers['authorization']
    if (!auth) {
      ctx.status = 401
      ctx.body = {
        code: ResponseCode.UNAUTH,
        msg: '无 token，请登录'
      }
    }
    const token = auth!.split(' ')[1]
    jwt.verify(token, Config.encrypt, (err) => {
      if (err) {
        ctx.status = 401
        ctx.body = {
          code: ResponseCode.UNAUTH,
          msg: 'token 无效，请重新登录'
        }
      }
      return next()
    })
  }
}

export function create (data: any): string {
  return jwt.sign(data, Config.encrypt, {expiresIn: '7d'})
}
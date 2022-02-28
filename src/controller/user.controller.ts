import {Service} from 'typedi'
import { Context } from 'koa'
import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx, UseBefore} from 'routing-controllers'

import {User, PageType, ResponseCode} from '../../types/global'
import UserService, {Query} from '../service/user.service'
import { Cors } from '../middleware/cors'

@JsonController()
@Service()
export class UserController {

  constructor(private userService: UserService) {}

  @Get('/users')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>
    const {account, nickName, status, page = 1, size = 10} = query

    const params: Partial<Query> = {}

    if (account) {
      params.account = account
    }

    if (nickName) {
      params.nickName = new RegExp(nickName, 'i') as any
    }

    if (status !== undefined) {
      params.status = status
    }
    try {
      const datas = await this.userService.findAll(params, page, size)
      return {
        code: ResponseCode.SUCCESS,
        ...datas
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Post('/login')
  @UseBefore(Cors)
  async login (@Body() user: Pick<User, 'account' | 'psw'>) {
    try {
      let info = await this.userService.findOne(user.account)
      if (info?.psw !== user.psw) {
        return {
          code: ResponseCode.FAIL,
          msg: '密码错误'
        }
      }
      if (!info.fristLogin) {
        info.fristLogin = true
      }
      info.lastLoginTime =  Date.now()

      info = await info.save()

      return {
        code: ResponseCode.SUCCESS,
        msg: '登录成功',
        data: info
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Post('/user')
  async register (@Body() user:  Pick<User, 'account' | 'psw' | 'email'>) {
    try {
      const data = await this.userService.create(user)
      if (data.isExist) {
        return {
          code: ResponseCode.EXISTED,
          msg: '该账号已存在'
        }
      }
      return {
        code: ResponseCode.SUCCESS,
        msg: '创建成功',
        user: data.user
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Put('/user/:id')
  async modify (@Param('id') id: any, @Body() user: Partial<User>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      const flag = await this.userService.updateById(id, user)
      if (!flag) {
        return {
          code: ResponseCode.FAIL,
          msg: '用户信息更新失败'
        }
      }
      return {
        code: ResponseCode.SUCCESS,
        msg: '用户信息更新成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Delete('/user/:id')
  async delOne (@Param('id') id: any) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      const flag = await this.userService.deleteById(id)

      if (!flag) {
        return {
          code: ResponseCode.FAIL,
          msg: '删除失败'
        }
      }
      return {
        code: ResponseCode.SUCCESS,
          msg: '删除成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }
}
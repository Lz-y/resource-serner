import {Context} from 'koa'
import {Service} from 'typedi'
import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx} from 'routing-controllers'

import {Logs, PageType, ResponseCode} from '../../types/global'
import LogService, {Query} from '../service/log.service'

@JsonController()
@Service()
export class LogController {

  constructor(private logService: LogService){}

  @Get('/logs')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>
    const {userAgent, code, status, page = 1, size = 10} = query

    const params: Partial<Query> = {}

    if (userAgent) {
      params.userAgent = new RegExp(userAgent, 'i') as any
    }

    if (code) {
      params.code = code
    }

    if (status !== undefined) {
      params.status = status
    }
    
    try {
      const datas = await this.logService.findAll(params, page, size)
      return {
        code: ResponseCode.SUCCESS,
        result: datas
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Post('/log')
  async create (@Body() log: Partial<Logs>) {
    try {
      await this.logService.create(log)
      return {
        code: ResponseCode.SUCCESS,
        msg: '新增成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Put('/log/:id')
  async modify (@Param('id') id: string, @Body() log: Partial<Logs>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      await this.logService.updateById(id as any, log)

      return {
        code: ResponseCode.SUCCESS,
        msg: '更新成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Delete('/log/:id')
  async delOne (@Param('id') id: string) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      const flag = await this.logService.deleteById(id as any)

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
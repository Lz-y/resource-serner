import {Context} from 'koa'
import {Service} from 'typedi'
import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx} from 'routing-controllers'

import {Resource, PageType, ResponseCode} from '../../types/global'
import ResourceService, {Query} from '../service/resource.service'

@JsonController()
@Service()
export class ResourceController {

  constructor(private resourceService: ResourceService){}

  @Get('/resources')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>
    const {name, encrypt, status, page = 1, size = 10} = query

    const params: Partial<Query> = {}

    if (name) {
      params.name = new RegExp(name, 'i') as any
    }

    if (encrypt !== undefined) {
      params.encrypt = encrypt
    }

    if (status !== undefined) {
      params.status = status
    }
    try {
      const datas = await this.resourceService.findAll(params, page, size)
      return {
        code: ResponseCode.SUCCESS,
        data: datas
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Post('/resource')
  async create (@Body() log: Partial<Resource>) {
    try {
      await this.resourceService.create(log)
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

  @Put('/resource/:id')
  async modify (@Param('id') id: any, log: Partial<Resource>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      await this.resourceService.updateById(id, log)

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

  @Delete('/resource/:id')
  async delOne (@Param('id') id: any) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      const flag = await this.resourceService.updateById(id, {})

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
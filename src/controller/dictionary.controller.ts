import {Context} from 'koa'
import {Service} from 'typedi'
import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx} from 'routing-controllers'
import {ProjectionFields} from 'mongoose'

import {Dictionary, PageType, ResponseCode} from '../../types/global'
import DictionaryService, {Query} from '../service/dictionary.service'

@JsonController()
@Service()
export class DictionaryController {

  constructor(private dictionaryService: DictionaryService){}

  @Get('/dictionaries')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>
    const {name, status, page = 1, size = 10} = query

    const params: ProjectionFields<Dictionary> = {}

    if (name) {
      params.name = new RegExp(name, 'i') as any
    }

    if (status && status !== undefined) {
      params.status = parseInt(status as any, 10)
    }
    try {
      const datas = await this.dictionaryService.findAll(params, page, size)
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

  @Get('/dictionary')
  async getOne (@Ctx() ctx: Context) {
    const {type} = ctx.query as unknown as Partial<Query>

    if (!type) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'type 不能为空'
      }
    }
    try {
      const data = await this.dictionaryService.findByType(type)

      if (data?.length === 0) {
        return {
          code: ResponseCode.NOTFOUND,
          msg: '该字典不存在'
        }
      }
      return {
        code: ResponseCode.SUCCESS,
        data
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Post('/dictionary')
  async create (@Body() dict: Partial<Dictionary>) {
    try {
      await this.dictionaryService.create(dict)
      return {
        code: ResponseCode.SUCCESS,
        msg: '新增字典成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Put('/dictionary/:id')
  async modify (@Param('id') id: string, @Body() dict: Partial<Dictionary>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      await this.dictionaryService.updateById(id as any, dict)

      return {
        code: ResponseCode.SUCCESS,
        msg: '字典更新成功'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Delete('/dictionary/:id')
  async delOne (@Param('id') id: string) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      const flag = await this.dictionaryService.deleteById(id as any)

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
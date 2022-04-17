import {Context} from 'koa'
import {Service} from 'typedi'
import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx} from 'routing-controllers'

import {Schedule, PageType, ResponseCode} from '../../types/global'
import ScheduleService, {Query} from '../service/schedule.service'

@JsonController()
@Service()
export class ScheduleController {

  constructor(private scheduleService: ScheduleService){}

  @Get('/schedules')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>
    const {name, spend, status, page = 1, size = 10} = query

    const params: Partial<Query> = {}

    if (name) {
      params.name = new RegExp(name, 'i') as any
    }

    if (spend && spend.length !== 0) {
      params.spend = spend
    }

    if (status !== undefined) {
      params.status = status
    }
    try {
      const datas = await this.scheduleService.findAll(params, page, size)
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

  @Post('/schedule')
  async create (@Body() schedule: Partial<Schedule>) {
    try {
      await this.scheduleService.create(schedule)
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

  @Put('/schedule/:id')
  async modify (@Param('id') id: string, @Body() schedule: Partial<Schedule>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      await this.scheduleService.updateById(id as any, schedule)

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

  @Delete('/schedule/:id')
  async delOne (@Param('id') id: string) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      const flag = await this.scheduleService.deleteById(id as any)

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
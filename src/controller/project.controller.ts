import {Context} from 'koa'
import {Service} from 'typedi'
import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx} from 'routing-controllers'

import {Project, PageType, ResponseCode} from '../../types/global'
import ProjectService, {Query} from '../service/project.service'

@JsonController()
@Service()
export class ProjectController {

  constructor(private projectService: ProjectService){}

  @Get('/projects')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>
    const {name, status, page = 1, size = 10} = query

    const params: Partial<Query> = {}

    if (name) {
      params.name = new RegExp(name, 'i') as any
    }

    if (status !== undefined) {
      params.status = status
    }
    try {
      const datas = await this.projectService.findAll(params, page, size)
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

  @Post('/project')
  async create (@Body() log: Partial<Project>) {
    try {
      await this.projectService.create(log)
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

  @Put('/project/:id')
  async modify (@Param('id') id: string, log: Partial<Project>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      await this.projectService.updateById(id as any, log)

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

  @Delete('/project/:id')
  async delOne (@Param('id') id: string) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      const flag = await this.projectService.deleteById(id as any)

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
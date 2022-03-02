import {Context} from 'koa'
import {Service} from 'typedi'
import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx} from 'routing-controllers'


import {Message, PageType, ResponseCode} from '../../types/global'
import MessageService, {Query} from '../service/message.service'

@JsonController()
@Service()
export class MessageController {

  constructor (private messageService: MessageService) {}

  @Get('/messages')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>
    const {title, replyStatus, status, page = 1, size = 10} = query

    const params: Partial<Query> = {}

    if (title) {
      params.title = new RegExp(title, 'i') as any
    }

    if (replyStatus !== undefined) {
      params.replyStatus = replyStatus
    }

    if (status !== undefined) {
      params.status = status
    }
    try {
      const datas = await this.messageService.findAll(params, page, size)
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

  @Post('/message')
  async create (@Ctx() ctx: Context, @Body() message: Partial<Message>) {
    // todo: 限制评论次数
    try {
      await this.messageService.create(message)
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

  @Put('/message/:id')
  async modify (@Param('id') id: string, message: Partial<Message>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      await this.messageService.updateById(id as any, message)

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

  @Delete('/message/:id')
  async delOne (@Param('id') id: string) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    try {
      const flag = await this.messageService.updateById(id as any, {})

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
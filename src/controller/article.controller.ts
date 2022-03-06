import {JsonController, Param, Body, Get, Post, Put, Delete, Ctx} from 'routing-controllers'
import {Service} from 'typedi'
import { Context } from 'koa'
import {ProjectionFields} from 'mongoose'

import ArticleService, {Query} from '../service/article.service'

import {Article, PageType, ResponseCode} from '../../types/global'

@JsonController()
@Service()
export class ArticleController {

  constructor (private articleService: ArticleService){
  }

  @Get('/articles')
  async all (@Ctx() ctx: Context) {
    const query = ctx.query as unknown as Partial<Query & PageType>

    const {title, classify, tags, encrypt, status, page = 1, size = 10} = query
    const params: ProjectionFields<Article> = {}
    if (title) {
      params['title'] = new RegExp(title, 'i') as any
    }
    if (classify) {
      params.classify = classify
    }
    if (tags) {
      params.tags = {$in: (tags as unknown as string).split(',')}
    }
    if (encrypt && encrypt !== undefined) {
      params.encrypt = parseInt(encrypt as any, 10)
    }
    if (status && status !== undefined) {
      params.status = parseInt(status as any, 10)
    }
    try {
      const data = await this.articleService.findAll(params, page, size)
      return {
        code: ResponseCode.SUCCESS,
        result: data
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Get('/article/:id')
  async one(@Param('id') id: string, @Ctx() ctx: Context) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id 不能为空'
      }
    }
    // todo: 防刷 （IP + client）
    // const ip = ctx.ip
    // const userAgent = ctx.headers['user-agent']

    try {
      const data = await this.articleService.findById(id as any)

      if (data && !data._id) {
        return {
          code: ResponseCode.NOTFOUND,
          msg: '该文章不存在'
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

  @Post('/article')
  async create (@Body() article: Partial<Article>) {
    if (!article.title || !article.content) {
      return {
        code: ResponseCode.NOTNULL,
        msg: '标题和内容不能为空'
      }
    }
    try {
      await this.articleService.create(article)
      return {
        code: ResponseCode.SUCCESS,
        msg: '成功添加文章，是否返回上一页？'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Put('/article/:id')
  async modify (@Param('id') id: string, @Body() article: Partial<Article>) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id不能为空'
      }
    }
    try {
      await this.articleService.updateById(id as any, article)

      return {
        code: ResponseCode.SUCCESS,
        msg: '文章已更新，是否返回上一页？'
      }
    } catch (error) {
      console.error(error)
      return {
        code: ResponseCode.ERROR,
        msg: '服务端错误'
      }
    }
  }

  @Delete('/article/:id')
  async delOne (@Param('id') id: string) {
    if (!id) {
      return {
        code: ResponseCode.NOTNULL,
        msg: 'id不能为空'
      }
    }
    try {
      const flag = await this.articleService.updateById(id as any, {deleted: true})
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
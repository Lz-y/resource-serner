import {Service} from 'typedi'
import {Model, ObjectId} from 'mongoose'
import {Article} from '../../types/global'
import ArticleModel from '../db/model/article'

export type Query = Pick<Article, 'title' | 'classify' | 'tags' | 'encrypt' | 'status'>

@Service()
export default class ArticleService {

  private model: Model<Article> = ArticleModel
  
  async findAll (query: Partial<Query>, page: number, size: number) {
    const skip = (page - 1) * size
    try {
      const data = await this.model.find(query).select('-content -updateTime').sort({ createTime: -1 }).limit(size).skip(skip).lean().exec()
      data.forEach(item => {
        item._id = item._id.toString() as any
      })
      const total = await this.model.count(query).exec()
      return {
        data,
        total
      }
    } catch (error) {
     throw error
    }
  }

  async findById (id: ObjectId) {
    try {
      const doc = await this.model.findByIdAndUpdate(id, { $inc: { viewNum: 1 } }).select('title classify content img tags encrypt status').lean().exec()
      doc!._id = doc?._id.toString() as any
      return doc
    } catch (error) {
      throw error
    }
  }

  async create (article: Partial<Article>): Promise<boolean> {
    try {
      await this.model.create(article)
      return true
    } catch (error) {
      throw error
    }
  }

  async updateById (id: ObjectId, article: Partial<Article>): Promise<boolean> {
    try {
      await this.model.findByIdAndUpdate(id, article).exec()
      return true
    } catch (error) {
      throw error
    }
  }
}
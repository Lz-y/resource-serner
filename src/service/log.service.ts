import {Service} from 'typedi'
import {Model, ObjectId} from 'mongoose'
import {Logs} from '../../types/global'
import LogModel from '../db/model/log'

export type Query = Pick<Logs, 'userAgent' | 'code' | 'status'>

@Service()
export default class LogService {

  private model: Model<Logs> = LogModel

  async findAll (query: Partial<Query>, page: number, size: number) {

    const skip = (page - 1) * size

    try {
      const data = await this.model.find(query).select('-updateTime').sort({createTime: -1}).limit(size).skip(skip).lean().exec()
      const total = await this.model.count(query).exec()

      data.forEach(item => {
        item._id = item._id.toString() as any
      })
      return {
        data,
        total
      }
    } catch (error) {
      throw error
    }
  }

  async create (log: Partial<Logs>) {
    try {
      await this.model.create(log)
      return true
    } catch (error) {
      throw error
    }
  }

  async updateById (id: ObjectId, log: Partial<Logs>) {
    try {
      await this.model.findByIdAndUpdate(id, log).exec()
      return true
    } catch (error) {
      throw error
    }
  }

 async deleteById (id: ObjectId) {
   try {
     await this.model.findByIdAndDelete(id).exec()
     return true
   } catch (error) {
     throw error
   }
 }
}
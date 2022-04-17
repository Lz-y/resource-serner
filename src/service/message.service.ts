import {Service} from 'typedi'
import {Model, ObjectId} from 'mongoose'
import {Message} from '../../types/global'
import MessageModel from '../db/model/message'

export type Query = Pick<Message, 'message' | 'replyStatus' | 'status'>

@Service()
export default class MessageService {

  private model: Model<Message> = MessageModel
  
  async create (message: Partial<Message>) {
    try {
      await this.model.create(message)
    } catch (error) {
      throw error
    }
  }

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

  async updateById (id: ObjectId, message: Partial<Message>) {
    try {
      await this.model.findByIdAndUpdate(id, message).exec()
      return true
    } catch (error) {
      throw error
    }
  }
  async delById(id: ObjectId) {
    try {
      await this.model.findByIdAndDelete(id).exec()
      return true
    } catch (error) {
      throw error
    }
  }
}
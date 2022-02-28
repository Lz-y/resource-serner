import {Service} from 'typedi'
import {Model, ObjectId} from 'mongoose'
import {Schedule} from '../../types/global'
import ScheduleModel from '../db/model/schedule'


export type Query = Pick<Schedule, 'name' | 'spend' | 'status'>

@Service()
export default class ScheduleService {

  private model: Model<Schedule> = ScheduleModel
  

  async findAll (query: Partial<Query>, page: number, size: number) {
    const skip = (page - 1) * size
    try {
      const data = await this.model.find(query).sort({createtime: -1}).limit(size).skip(skip).exec()

      const total = await this.model.count(query).exec()

      return {
        data,
        total
      }
    } catch (error) {
      throw error
    }
  }

  async create (schedule: Partial<Schedule>) {
    try {
      await this.model.create(schedule)
      return true
    } catch (error) {
      throw error
    }
  }

  async updateById (id: ObjectId, schedule: Partial<Schedule>) {
    try {
      await this.model.findByIdAndUpdate(id, schedule)
      return true
    } catch (error) {
      throw error
    }
  }
}
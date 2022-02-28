import {Service} from 'typedi'
import {Model, ObjectId} from 'mongoose'
import {Dictionary} from '../../types/global'
import DictionaryModel from '../db/model/dictionary'


export type Query = Pick<Dictionary, 'name' | 'status'>

@Service()
export default class DictionaryService {

  private model: Model<Dictionary> = DictionaryModel

  async findAll (query: Partial<Query>, page: number, size: number) {

    const skip = (page - 1) * size

    try {
      const data = await this.model.find(query).sort({createTime: -1}).limit(size).skip(skip).exec()
      const total = await this.model.count(query).exec()

      return {
        data,
        total
      }
    } catch (error) {
      throw error
    }
  }

  async create (dict: Partial<Dictionary>) {
    try {
      await this.model.create(dict)
      return true
    } catch (error) {
      throw error
    }
  }

  async updateById (id: ObjectId, dict: Partial<Dictionary>) {
    try {
      await this.model.findByIdAndUpdate(id, dict)
      return true
    } catch (error) {
      throw error
    }
  }

  async deleteById (id: ObjectId) {
    try {
      await this.model.findByIdAndDelete(id)
      return true
    } catch (error) {
      throw error
    }
  }
}
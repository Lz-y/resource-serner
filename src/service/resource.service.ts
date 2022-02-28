import {Service} from 'typedi'
import {Model, ObjectId} from 'mongoose'
import {Resource} from '../../types/global'
import ResourceModel from '../db/model/resource'

export type Query = Pick<Resource, 'name' | 'encrypt' | 'status'>

@Service()
export default class ResourceService {

  private model: Model<Resource> = ResourceModel
  
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

  async create (resource: Partial<Resource>) {
    try {
      await this.model.create(resource)
      return true
    } catch (error) {
      throw error
    }
  }

  async updateById (id: ObjectId, resource: Partial<Resource>) {
    try {
      await this.model.findByIdAndUpdate(id, resource)
      return true
    } catch (error) {
      throw error
    }
  }
}
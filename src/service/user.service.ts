import {Service} from 'typedi'
import {Model, ObjectId} from 'mongoose'
import {User} from '../../types/global'
import UserModel from '../db/model/user'

export type Query = Pick<User, 'account' | 'nickName' | 'status'>

@Service()
export default class UserService {

  private model: Model<User> = UserModel

  async create (user: Partial<User>) {
    try {
      const _user = await this.model.exists({account: user.account}).exec()
      if (_user && _user._id) {
        return {
          isExist: true
        }
      }
      const userDoc = await this.model.create(user)
      return {
        isExist: false,
        user: userDoc
      }
    } catch (error) {
      throw error
    }
  }

  async findAll (query: Partial<Query>, page: number, size: number) {
    const skip = (page - 1) * size

    try {
      const data = await this.model.find(query).sort({createTime: -1}).limit(size).skip(skip).lean().exec()
      const total = await this.model.count(query).exec()
      return {
        data,
        total
      }
    } catch (error) {
      throw error
    }
  }

  async findOne (account: string) {
    try {
      const user = await this.model.findOne({account}).exec()
      return user
    } catch (error) {
      throw error
    }
  }

  async updateById (id: ObjectId, user: Partial<User>): Promise<boolean> {
    try {
      await this.model.findByIdAndUpdate(id, user).exec()
      return true
    } catch (error) {
      throw error
    }
  }
}
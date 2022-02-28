import {Schema, model} from "mongoose"

import {User} from '../../../types/global'

const userScheme = new Schema<User>({
  account: {unique: true, type: String, maxlength: 20, minlength: 8},
  psw: {type: String, maxlength: 10, minlength: 6},
  nickName: {type: String},
  avatar: String,
  email: String,
  status: {type: Number, default: 1},
  fristLogin: {type: Boolean, default: true},
  lastLoginTime: Number
}, {
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})

export default model<User>('user', userScheme)
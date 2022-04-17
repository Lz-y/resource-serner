import {Schema, model} from "mongoose"

import {User} from '../../../types/global'

const userScheme = new Schema<User>({
  account: {unique: true, type: String, maxlength: 20, minlength: 8},
  psw: {type: String, maxlength: 10, minlength: 6, select: false},
  nickName: {type: String},
  gender: Number,
  avatar: String,
  email: String,
  status: {type: Number, default: 1},
  fristLogin: {type: Boolean, default: true},
  lastLoginTime: Schema.Types.Date,
  deleted: {type: Boolean, default: false, select: false}
}, {
  id: true,
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'},
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export default model<User>('user', userScheme)
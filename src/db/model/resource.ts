import {Schema, model} from "mongoose"

import {Resource} from '../../../types/global'

const resourceScheme = new Schema<Resource>({
  name: String,
  img: String,
  link: String,
  classify: String,
  summary: String,
  encrypt: {type: Number, default: 1},
  psw: {type: String, maxlength: 10, minlength: 6},
  status: {type: Number, default: 0}
}, {
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})

export default model<Resource>('resource', resourceScheme)
import {Schema, model} from "mongoose"

import {Project} from '../../../types/global'

const projectScheme = new Schema<Project>({
  name: String,
  img: String,
  description: String,
  runningTime: Number,
  status: {type: Number, default: 0},
  deleted: {type: Boolean, default: false}
}, {
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})

export default model<Project>('project', projectScheme)
import {Schema, model} from "mongoose"

import {Project} from '../../../types/global'

const projectScheme = new Schema<Project>({
  name: String,
  img: String,
  link: String,
  classify: String,
  description: String,
  runningTime: Number,
  status: {type: Number, default: 0}
}, {
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'},
  id: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export default model<Project>('project', projectScheme)
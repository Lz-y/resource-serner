import {Schema, model} from "mongoose"

import {Schedule} from '../../../types/global'

const scheduleScheme = new Schema<Schedule>({
  name: String,
  summary: String,
  spend: [Date],
  status: {type: Number, default: 0},
  deleted: {type: Boolean, default: false}
}, {
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})

export default model<Schedule>('schedule', scheduleScheme)
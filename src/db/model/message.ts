import {Schema, model} from "mongoose"

import {Message} from '../../../types/global'

const scheduleScheme = new Schema<Message>({
  title: String,
  content: {type: String, maxlength: 1000},
  replyTime: Date,
  replyStatus: {type: Number, default: 0},
  status: {type: Number, default: 0},
  deleted: {type: Boolean, default: false}
}, {
  versionKey: false,
  timestamps: {createdAt: 'publishTime', updatedAt: 'updateTime'}
})

export default model<Message>('message', scheduleScheme)
import {Schema, model} from "mongoose"

import {Message} from '../../../types/global'

const scheduleScheme = new Schema<Message>({
  message: String,
  replyContent: {type: String, maxlength: 1000},
  replyTime: Date,
  replyStatus: {type: Number, default: 0},
  status: {type: Number, default: 1},
  deleted: {type: Boolean, default: false, select: false}
}, {
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'},
  id: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export default model<Message>('message', scheduleScheme)
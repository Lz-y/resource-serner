import {Schema, model} from "mongoose"

import {Logs} from '../../../types/global'

const logScheme = new Schema<Logs>({
  ip: String,
  userAgent: String,
  url: String,
  code: {type: Number},
  status: {type: Number, default: 0},
  deleted: {type: Boolean, default: false, select: false}
}, {
  versionKey: false,
  timestamps: {createdAt: 'requestTime', updatedAt: 'updateTime'},
  id: true,
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export default model<Logs>('log', logScheme)
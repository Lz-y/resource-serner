import {Schema, model} from "mongoose"

import {Logs} from '../../../types/global'

const logScheme = new Schema<Logs>({
  ip: String,
  userAgent: String,
  url: String,
  requestStatus: {type: Number, default: 200},
  status: {type: Number, default: 0},
  deleted: {type: Boolean, default: false}
}, {
  versionKey: false,
  timestamps: {createdAt: 'requestTime', updatedAt: 'updateTime'}
})

export default model<Logs>('log', logScheme)
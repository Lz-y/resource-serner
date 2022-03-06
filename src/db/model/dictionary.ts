import {Schema, model} from "mongoose"

import {Dictionary} from '../../../types/global'

const dictionaryScheme = new Schema<Dictionary>({
  name: String,
  type: String,
  children: [{type: Schema.Types.ObjectId, ref: 'Dictionary'}],
  status: {type: Number, default: 1},
  deleted: {type: Boolean, default: false, select: false}
}, {
  id: true,
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'},
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})

export default model<Dictionary>('dictionary', dictionaryScheme)
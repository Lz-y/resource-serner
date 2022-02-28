import {Schema, model, ObjectId} from "mongoose"

import {Dictionary} from '../../../types/global'

const dictionaryScheme = new Schema<Dictionary>({
  name: String,
  type: String,
  children: [{type: Schema.Types.ObjectId, ref: 'Dictionary'}],
  status: {type: Number, default: 1}
}, {
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}
})

export default model<Dictionary>('dictionary', dictionaryScheme)
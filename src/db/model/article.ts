import {Schema, model} from "mongoose"

import {Article} from '../../../types/global'

const articleScheme = new Schema<Article>({
  title: String,
  classify: {type: String, default: 'blog'},
  tags: [String],
  img: String,
  content: String,
  encrypt: {type: Number, default: 1},
  viewNum: {type: Number, default: 0},
  commentNum: {type: Number, default: 0},
  likeNum: {type: Number, default: 0},
  psw: {type: String, maxlength: 10, minlength: 6, select: false},
  status: {type: Number, default: 0},
  publishTime: Date,
  deleted: {type: Boolean, default: false, select: false}
}, {
  id: true,
  versionKey: false,
  timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'},
  toJSON: {virtuals: true},
  toObject: {virtuals: true}
})


export default model<Article>('article', articleScheme)
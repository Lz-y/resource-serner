import mongoose from 'mongoose'
import Config from '../config'

export default function connect () {
  mongoose.connect(Config.db.url, {
    keepAlive: true,
  })

  mongoose.connection.on('error', (error) => {
    console.log('mongodb connect error: ', error)
  })

  mongoose.connection.once('open', () => {
    console.log('mongodb connection success')
  })
}
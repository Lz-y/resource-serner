import Koa from 'koa'
import {useKoaServer, useContainer} from 'routing-controllers'
import 'reflect-metadata'
import {Container} from 'typedi'

import * as Controllers from './controller'
import dictToArray from './helper/dictToArray'
import useMiddles from './helper/useMiddles'
import connect from './db'

const koa = new Koa()

useMiddles(koa)

useContainer(Container)

connect()
const app = useKoaServer<Koa>(koa, {
  routePrefix: '/api',
  controllers: dictToArray(Controllers)
})

app.listen(3060, () => {
  console.log('serve is listening at port 3060')
})
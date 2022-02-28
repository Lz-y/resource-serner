// import {Context, Next} from 'koa'
// import 'reflect-metadata'
// import router from '../controller'

// // 守卫
// export function Guard (middlewares: Array<(ctx: Context, next: Next) => Promise<any>>) {
//   return function (target: any) {
//     target.prototype.middlewares = middlewares
//   }
// }

// type RequestMethods = 'get' | 'post' | 'put' | 'delete'

// function methodDecorator (method: RequestMethods) {
//   return function (path: string) {
//     return function (target: any, property: string, descritptor: PropertyDescriptor) {
//       // process.nextTick(() => {
//         const middlewares = []
    
//         if (target.middlewares) {
//           middlewares.push(...target.middlewares)
//         }
//         middlewares.push(target[property])
//         router[method](path, ...middlewares)
//       // })
//     }
//   }
// }

// export const Get = methodDecorator('get')
// export const Post = methodDecorator('post')
// export const Put = methodDecorator('put')
// export const Del = methodDecorator('delete')

// function Inject (fn: Function) {
//   return function (target: any, name: string, index: number) {
    
//   }
// }

// export function Body () {
//   return function (target: any, name: string, index: number) {
//     console.log(target, name, index)
//   }
// }

// export function Params () {
//   return function (target: any, name: string, index: number) {
//     console.log(target, name, index)
//   }
// }

// export function Query (key: string) {
//   return function (target: any, name: string, index: number) {
//     console.log(target, name, index)
//   }
// }



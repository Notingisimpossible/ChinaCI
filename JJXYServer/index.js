const Koa = require('koa')
const cors = require('koa2-cors') 
const bodyparser = require('koa-bodyparser')
// const koaBody = require('koa-body')
// 实例化
const app = new Koa()

const student = require('./newRouter/student')
// 处理跨域
app.use(cors({
  origin: function(ctx) {
    // console.log(ctx,ctx.request.header.origin)
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods:['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 使用中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// app.use(koaBody())

// 使用路由
app.use(student.routes(), student.allowedMethods())

console.log(`服务器正在运行：http://localhost:8080`)
app.listen(8080)
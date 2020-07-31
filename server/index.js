const Koa = require('koa')
const cors = require('koa2-cors') 
const bodyparser = require('koa-bodyparser')
// const koaBody = require('koa-body')
// 实例化
const app = new Koa()

const user = require('./allRouter/user')
const product = require('./allRouter/product')
const order = require('./allRouter/order')

// 处理跨域
app.use(cors({
  origin: function(ctx) {
    if(ctx.url === '/test') {
      return false
    }
    return '*'
  },
  allowMethods:['GET', 'POST'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 使用中间件
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
// app.use(koaBody())

// 使用路由
app.use(user.routes(), user.allowedMethods());
app.use(product.routes(), product.allowedMethods());
app.use(order.routes(), order.allowedMethods());


console.log(`服务器正在运行：http://localhost:8080`)
app.listen(8080)
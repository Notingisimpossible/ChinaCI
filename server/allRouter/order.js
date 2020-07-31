const router = require('koa-router')()
const sqlServer = require('../db/mySqlConfig')
const date = require('../getDate')

// 路由前缀
router.prefix('/order')

// 获取订单列表
router.get('/all',async (ctx, next) => {
  await sqlServer.getAllOrder()
  .then(res => {
    ctx.body = res
  })
})

// 删除订单
router.post('/delete', async (ctx, next) => {
  let id = ctx.request.body.id || ""
  if(!id) {
    throw new Error("id不能为空")
  }else{
    await sqlServer.findOrder(id)
    .then(async res => {
      if(res.length) {
        await sqlServer.deleteOrder(id)
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.body = {
              code:200,
              message:"删除成功"
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
      }else{
        ctx.body = {
          code:204,
          message:"无效id"
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
})
// 添加订单
router.post('/add', async (ctx,next) => {
  // console.log(ctx.request.body)
  let id = ctx.request.body.id || ""
  let order_date = date.getNowDate()
  let purchaser = ctx.request.body.purchaser || ""
  let quantity = ctx.request.body.quantity || ""
  let product_id = ctx.request.body.product_id || ""
  if(!id){
    throw new Error("id不能为空")
  }else{
    await sqlServer.findOrder(id)
    .then(async res => {
      if(res.length) {
        ctx.body = {
          code: 406,
          message:"订单已存在"
        }
      }else{
        await sqlServer.addOrder([id, order_date, purchaser, quantity, product_id])
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.body = {
              code: 200,
              message: "添加成功"
            }
          }else{
            ctx.body = {
              code: 406,
              message: "添加失败"
            }
          }
        })
        .catch(err => {
          console.log(err)
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
})
module.exports = router
const router = require('koa-router')()
// const seqlize = require('../db/mySqlConfig')
const date = require('../getDate')
const expectionHandle = require('../expectionHandle')
const seqlize = require('../seqlize/index')

// 路由前缀
router.prefix('/order')

// 获取订单列表
router.get('/all',async (ctx, next) => {
  await seqlize.getAllOrder()
  .then(res => {
    ctx.body = res
  })
})

// 删除订单
router.del('/delete/:id', async (ctx) => {
  let id = parseInt(ctx.params.id) || ""
  try {
    await seqlize.findOrder(id)
    .then(async res => {
      if(res.length) {
        await seqlize.deleteOrder(id)
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
            ctx.body = expectionHandle.success("删除成功")
          }
        })
        .catch(err => {
          expectionHandle.catchError(err)
          console.log(err)
        })
      }else{
        // ctx.status = 204
        ctx.body = expectionHandle.invalidId()
      }
    })
    .catch(err => {
      expectionHandle.catchError(err)
      console.log(err)
    })
  } catch (error) {
    ctx.body = expectionHandle.existenceId(error)
    console.log(error)
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
  try {
    await seqlize.findOrder(id)
    .then(async res => {
      if(res.length) {
        ctx.status = 406
        ctx.body = expectionHandle.faild("订单已存在")
      }else{
        await seqlize.addOrder([id, order_date, purchaser, quantity, product_id])
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
            ctx.body = expectionHandle.success("添加成功")
          }else{
            ctx.status = 406
            ctx.body = expectionHandle.faild("添加失败")
          }
        })
        .catch(err => {
          expectionHandle.catchError(err)
          console.log(err)
        })
      }
    })
    .catch(err => {
      expectionHandle.catchError(err)
      console.log(err)
    })
  } catch (error) {
    ctx.body = expectionHandle.existenceId(error)
    console.log(error)
  }
})
// 修改订单
router.put('/change/:id',async (ctx,next) => {
  let id = parseInt(ctx.params.id) || ""
  let order_date = date.getNowDate()
  try {
    await seqlize.findOrder(id)
    .then(async res => {
      if(!res.length) {
        ctx.status = 406
        ctx.body = expectionHandle.faild("用户不存在")
      }else{
        let purchaser = ctx.request.body.purchaser || res[0].purchaser ||""
        let quantity = ctx.request.body.quantity || res[0].quantity || ""
        let product_id = ctx.request.body.product_id || res[0].product_id || ""
        await seqlize.changeOrder([order_date, purchaser, quantity, product_id],id)
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
            ctx.body = expectionHandle.success("修改成功")
          }else{
            ctx.status = 406
            ctx.body = expectionHandle.faild("修改失败")
          }
        })
        .catch(err => {
          ctx.body = expectionHandle.catchError(err)
          console.log(err)
        })
      }
    })
    .catch(err => {
      ctx.body = expectionHandle.catchError(err)
      console.log(err)
    })
  } catch (error) {
    ctx.body = expectionHandle.existenceId(error)
    console.log(error)
  }
})
module.exports = router
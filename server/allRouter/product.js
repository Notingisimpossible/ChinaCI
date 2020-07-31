const router = require('koa-router')()
const sqlServer = require('../db/mySqlConfig')
// 路由前缀
router.prefix('/product')

// 获取产品列表
router.get('/all',async (ctx, next) => {
  await sqlServer.getAllProduct()
  .then(res => {
    ctx.body = res
  })
})
// 删除产品
router.del('/delete/:id', async (ctx, next) => {
  let id = parseInt(ctx.params.id) || ""
  if(!id) {
    ctx.body = {
      code: 400,
      Error: "id不能为空"
    }
  }else{
    await sqlServer.findProduct(id)
    .then(async res => {
      if(res.length) {
        await sqlServer.deleteProduct(id)
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
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
        // ctx.status = 204
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

// 添加产品
router.post('/add', async (ctx,next) => {
  // console.log(ctx.request.body)
  let id = ctx.request.body.id || ""
  let name = ctx.request.body.name || ""
  let description = ctx.request.body.description || ""
  let weight = ctx.request.body.weight || ""
  if(!id){
    throw new Error("id不能为空")
  }else{
    await sqlServer.findProduct(id)
    .then(async res => {
      if(res.length) {
        ctx.status = 406
        ctx.body = {
          code: 406,
          message:"产品已存在"
        }
      }else{
        await sqlServer.addProduct([id, name, description, weight])
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
            ctx.body = {
              code: 200,
              message: "添加成功"
            }
          }else{
            ctx.status = 406
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

// 修改产品
router.put('/change/:id',async (ctx,next) => {
  let id = parseInt(ctx.params.id) || ""
  if(!id){
    ctx.body = {
      code: 400,
      Error: "id不能为空"
    }
  }else{
    await sqlServer.findProduct(id)
    .then(async res => {
      if(!res.length) {
        ctx.status = 406
        ctx.body = {
          code: 406,
          message:"产品不存在"
        }
      }else{
        let name = ctx.request.body.name || res[0].name ||""
        let description = ctx.request.body.description || res[0].description || ""
        let weight = ctx.request.body.weight || res[0].weight || ""
        await sqlServer.changeOrder([name, description, weight,id])
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
            ctx.body = {
              code: 200,
              message: "修改成功"
            }
          }else{
            ctx.status = 406
            ctx.body = {
              code: 406,
              message: "修改失败"
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
const router = require('koa-router')()
// const seqlize = require('../db/mySqlConfig')
const expectionHandle = require('../expectionHandle')
const seqlize = require('../seqlize/index')

// 路由前缀
router.prefix('/product')

// 获取产品列表
router.get('/all',async (ctx, next) => {
  console.log(ctx.request.url)
  await seqlize.getAllProduct()
  .then(res => {
    ctx.body = res
  })
})
// 删除产品
router.del('/delete/:id', async (ctx, next) => {
  console.log(ctx.request.url)
  let id = parseInt(ctx.params.id) || ""
  try {
    await seqlize.findProduct(id)
    .then(async res => {
      if(res.length) {
        await seqlize.deleteProduct(id)
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
            ctx.body = expectionHandle.success("删除成功")
          }else{
            ctx.status = 406
            ctx.body = expectionHandle.faild("删除失败")
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
      console.log(err)
    })
  } catch (error) {
    ctx.body = expectionHandle.existenceId()
    console.log(error)
  }
})

// 添加产品
router.post('/add', async (ctx,next) => {
  console.log(ctx.request.url)
  // console.log(ctx.request.body)
  let id = ctx.request.body.id || ""
  let name = ctx.request.body.name || ""
  let description = ctx.request.body.description || ""
  let weight = ctx.request.body.weight || ""
  try {
    await seqlize.findProduct(id)
    .then(async res => {
      if(res.length) {
        ctx.status = 406
        ctx.body = expectionHandle.faild("无效的id")
      }else{
        await seqlize.addProduct([id, name, description, weight])
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
            ctx.body = expectionHandle.success("添加成功")
          }else{
            ctx.status = 406
            ctx.body = expectionHandle.success("添加失败")
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
    ctx.body = expectionHandle.existenceId()
    console.log(error)
  }
})

// 修改产品
router.put('/change/:id',async (ctx,next) => {
  let id = parseInt(ctx.params.id) || ""

  try {
    await seqlize.findProduct(id)
    .then(async res => {
      if(!res.length) {
        ctx.status = 406
        ctx.body = expectionHandle.faild("产品不存在")
      }else{
        let name = ctx.request.body.name || res[0].name ||""
        let description = ctx.request.body.description || res[0].description || ""
        let weight = ctx.request.body.weight || res[0].weight || ""
        await seqlize.changeProduct([name, description, weight],id)
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
    ctx.body = expectionHandle.existenceId()
    console.log(error)
  }
})
module.exports = router
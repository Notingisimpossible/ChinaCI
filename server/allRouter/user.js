const router = require('koa-router')()
const sqlServer = require('../db/mySqlConfig')
// 路由前缀
router.prefix('/user')

// 获取用户列表
router.get('/all',async (ctx, next) => {
  await sqlServer.getAllUser()
  .then(res => {
    ctx.body = res
  })
})
// 删除指定用户
router.del('/delete/:id',async (ctx, next) => {
  let id = parseInt(ctx.params.id) || ""
  if(!id){
    ctx.body = {
      code: 400,
      Error: "id不能为空"
    }
  }else{
    await sqlServer.findUser(id)
    .then(async res => {
      if(res.length){
        await sqlServer.deleteUser(id)
        .then(res => {
          if(res.affectedRows !== 0) {
            ctx.status = 200
            ctx.body = {
              code:200,
              message:"删除成功"
            }
          }else{
            ctx.status = 406
            ctx.body = {
              code: 406,
              message:"删除失败"
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
// 添加用户
router.post('/add', async (ctx,next) => {
  // console.log(ctx.request.body)
  let id = ctx.request.body.id || ""
  let first_name = ctx.request.body.first_name || ""
  let last_name = ctx.request.body.last_name || ""
  let email = ctx.request.body.email || ""
  if(!id){
    ctx.body = {
      code: 400,
      Error: "id不能为空"
    }
  }else{
    await sqlServer.findUser(id)
    .then(async res => {
      if(res.length) {
        ctx.status = 406
        ctx.body = {
          code: 406,
          message:"用户已存在"
        }
      }else{
        await sqlServer.addUser([id, first_name, last_name, email])
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
// 修改用户信息
router.put('/change/:id',async (ctx,next) => {
  let id = parseInt(ctx.params.id) || ""
  if(!id){
    ctx.body = {
      code: 400,
      Error: "id不能为空"
    }
  }else{
    await sqlServer.findUser(id)
    .then(async res => {
      if(!res.length) {
        ctx.status = 406
        ctx.body = {
          code: 406,
          message:"用户不存在"
        }
      }else{
        let first_name = ctx.request.body.first_name || res[0].first_name || ""
        let last_name = ctx.request.body.last_name || res[0].last_name || ""
        let email = ctx.request.body.email || res[0].email || ""
        await sqlServer.changeUser([first_name, last_name, email,id])
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
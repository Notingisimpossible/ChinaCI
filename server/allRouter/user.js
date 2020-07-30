const router = require('koa-router')()
const sqlServer = require('../db/mySqlConfig')
// 路由前缀
router.prefix('/user')

router.get('/all',async (ctx, next) => {
  await sqlServer.getAllUser()
  .then(res => {
    ctx.body = res
  })
})

router.post('/delete',async (ctx, next) => {
  console.log(ctx.request.body.id)
  ctx.body="你好"
})

module.exports = router
const router = require('koa-router')()
const sqlServer = require('../db/mySqlConfig')

// 路由前缀
router.prefix('/order')

router.get('/all',async (ctx, next) => {
  await sqlServer.getAllOrder()
  .then(res => {
    ctx.body = res
  })
})

module.exports = router
const router = require('koa-router')();
const sqlServer = require('../db/index')

router.prefix('/student')

// 获取指定id的学生成绩信息
router.get('/CJ/:id', async (ctx, next) => {
  let id = ctx.params.id || ""
  if(id) {
    await sqlServer.findCJById(id)
    .then(res => {
      ctx.body = res.rows
    })
  }
})


module.exports = router
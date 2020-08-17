const router = require('koa-router')();
const sqlServer = require('../db/index')

router.prefix('/student')

// 获取指定id的学生成绩信息
router.get('/CJ/:id', async (ctx, next) => {
  let id = ctx.params.id || ""
  if(id) {
    await sqlServer.findCJById(id)
    .then(res => {
      ctx.body = {
        "ID":res.ID,
        "姓名":res.XM,
        "课程名称": res.KCMC,
        "班级名称": res.BJMC,
        "学期": res.XQ,
        "总评成绩": res.ZPCJ,
      }
    })
    .catch(err => {
      ctx.body = err
      console.log(err)
    })
  }
})


module.exports = router
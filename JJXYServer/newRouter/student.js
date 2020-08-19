const router = require('koa-router')();
const sqlServer = require('../db/index')

router.prefix('/student')

// 获取指定id的学生成绩信息
router.get('/CJ', async (ctx, next) => {
  let url = ctx.request.url.split("?")[1].split("&")
  let value = url.reduce((preItem, item) => {
    let key = item.split("=")[0] || ""
    let val = item.split("=")[1] || ""
    if(!preItem[key]) {
      preItem[key] = val
    }
    return preItem
  },{})
  if(value) {
    await sqlServer.findCJById(value)
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
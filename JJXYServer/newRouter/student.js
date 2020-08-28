const router = require('koa-router')();
const sqlServer = require('../db/index')
const expectionHandle = require('../expectionHandle')
const data = require('../mock/data')

router.prefix('/student')

// 获取指定id的学生成绩信息
router.get('/cj', async (ctx, next) => {
  console.log(ctx.url)
  let value = ctx.request.query
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
// 获取课程表信息
router.get('/kcb',async (ctx, next) => {
  console.log(ctx.url)
  let value = ctx.request.query
  if(value) {
    // await sqlServer.findKCBById(value)
    // .then(res => {
      ctx.body = data.classInfo
    // })
    // .catch(err => {
    //   ctx.body = err
    //   console.log(err)
    // })
  }
})

// 查询一卡通基本信息
router.get('/card',(ctx,next) => {
  console.log(ctx.url)
  let value = ctx.request.query
  if(value.info === "info") {
    // await sqlServer.findCardById(value)
    // .then(res => {
      ctx.body = data.studentCardInfo
    // })
    // .catch(err => {
    //   ctx.body = err
    //   console.log(err)
    // })
  }else if(value.info === "money"){
    ctx.body = data.takeMoneyInfo
  }else{
    ctx.body = expectionHandle.faild("无效的查询路径")
  }
})
module.exports = router
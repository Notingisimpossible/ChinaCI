const execute = require("./excuteSql");
const allSql = require("../abstractSql")

// 查询指定id的成绩
const findCJById = async(value) => {
  let sql = await allSql.findCJSql(value)
  return await execute(sql)
}
// 通过id查询课程表
const findKCBById = async(value) => {
  let sql = await allSql.findKCBSql(value)
  return await execute(sql)
}
// 查询一卡通基本信息
const findCardById = async(value) => {
  let sql = await allSql.findCardSql(value)
  return await execute(sql)
}
module.exports = {
  findCJById,
  findKCBById,
  findCardById
}

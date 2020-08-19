const execute = require("./excuteSql");
const allSql = require("../abstractSql")

// 查询指定id的成绩
const findCJById = async(value) => {
  let sql = await allSql.findSql(value)
  return await execute(sql)
}

module.exports = {
  findCJById
}

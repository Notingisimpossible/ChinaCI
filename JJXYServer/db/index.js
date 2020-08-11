const execute = require("./excuteSql");

// 查询指定id的成绩
const findCJById = async(id) => {
  let sql = `SELECT * FROM XYC_V_TJX_CJXX WHERE id='${id}'`
  return await execute(sql)
}

module.exports = {
  findCJById
}

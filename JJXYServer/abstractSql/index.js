const findSql = (value) => {
  let sql = `select * from  XYC_V_TJX_CJXX where id='${value.id}'`
  return sql
}

module.exports = {
  findSql
}